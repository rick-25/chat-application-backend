import http from 'http'
import { Server } from 'socket.io'

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

  io.on('connection', async (client) => {
    const socket_ids = await getSocketIds();

    client.emit('peers', JSON.stringify(socket_ids.filter(id => id !== client.id)))
    client.broadcast.emit('peers', JSON.stringify(socket_ids))
    
    client.on('msg', (payload: { to: string, data: string }) => {
      client.broadcast.to(payload.to).emit('msg', { from: client.id, data: payload.data})
    })

    client.on('disconnect', async () => {
      client.broadcast.emit('peers', JSON.stringify(await getSocketIds()))
    })
  })

  return io
}