import http from 'http'
import { Server, Socket } from 'socket.io'
import { verifyToken } from './service/jwt';
import { create } from './service/message';

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
    const client_email = client.data.email

    socket_map[client_email] = client

    client
    .emit('peers', JSON.stringify(Object.keys(socket_map).filter(id => id !== client_email)))

    client
    .broadcast
    .emit('peers', JSON.stringify(Object.keys(socket_map)))
    
    client.on('msg', async (payload: { to: string, data: string }) => {
        try {
            await create({ ...payload, from: client_email })
            if(Object.keys(socket_map).includes(payload.to)) {
                client
                .broadcast
                .to(socket_map[payload.to].id)
                .emit('msg', { ...payload, from: client_email })
            }
        } catch (error) {
            console.log('msg event error: ', error);
        }
    })

    client.on('disconnect', async () => {
      delete socket_map[client_email]
      client
      .broadcast
      .emit('peers', JSON.stringify(Object.keys(socket_map)))
    })
  })

  return io
}