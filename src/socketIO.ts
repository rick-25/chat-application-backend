import http from 'http'
import { Server, Socket } from 'socket.io'
import { verifyToken } from './service/jwt';

const socket_map: any = {}

export default function initSocketIO(server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) {
  const io = new Server(server, {
    cors: { 
      origin: '*',
      methods: ["GET", "POST"]
    } 
  });

  const getSocketIds = async () => {
    const sockets = await io.fetchSockets()
    const socket_ids = sockets.map(s => s.id)
    return socket_ids
  }

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if(token) {
        const decoded = verifyToken(token);
        socket.data.email = decoded.email
        next();
    } else {
        next(new Error("Authentication error"));
    }
  });
  io.on('connection', async (client) => {
    const socket_ids = await getSocketIds();
    const client_email = client.data.email

    socket_map[client_email] = client

    client.emit('peers', JSON.stringify(Object.keys(socket_map).filter(id => id !== client_email)))
    client.broadcast.emit('peers', JSON.stringify(Object.keys(socket_map)))
    
    client.on('msg', (payload: { to: string, data: string }) => {
      client.broadcast.to(socket_map[payload.to].id).emit('msg', { from: client_email, data: payload.data})
    })

    client.on('disconnect', async () => {
      delete socket_map[client_email]
      client.broadcast.emit('peers', JSON.stringify(Object.keys(socket_map)))
    })
  })

  return io
}