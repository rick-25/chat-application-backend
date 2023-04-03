import express, { Express, Request, Response } from 'express';
import * as http from 'http'
import dotenv from 'dotenv';
import { Server } from 'socket.io'
import * as UserRouter from './router/user';
import * as MessageRouter from './router/message';
import authRouter from './router/auth'
import cors from 'cors'
import { CustomRequst, authenticateToken } from './middlewares/auth';

dotenv.config();

const app: Express = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json({}))
app.use(cors())

const server = new http.Server(app)
const port = process.env.PORT;

const io = new Server(server, {
  cors: { 
    origin: '*',
    methods: ["GET", "POST"]
  } 
});
io.on('connection', (client) => {
  console.log(`[${client.id}] connected!`);
})
// io.listen(3000);

app.get('/', async (req: Request, res: Response) => {
  res.send('Express + Typescript')
});

app.use(UserRouter.default)
app.use(MessageRouter.default)
app.use(authRouter)

app.use(authenticateToken)
app.get('/verify', (req, res) => {
  res.send((req as CustomRequst).token)
})

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
