import express, { Express, Request, Response } from 'express';
import * as http from 'http'
import dotenv from 'dotenv';
import { Server } from 'socket.io'
import * as UserRouter from './router/user';
import * as MessageRouter from './router/message';

dotenv.config();

const app: Express = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json({}))

const server = new http.Server(app)
const port = process.env.PORT;

const io = new Server(server);
io.on('connection', (client) => {
  console.log(`[${client.id}] connected!`);
})
// io.listen(3000);

app.get('/', async (req: Request, res: Response) => {
  res.send('Express + Typescript')
});

app.use(UserRouter.default)
app.use(MessageRouter.default)

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
