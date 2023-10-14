"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const jwt_1 = require("./service/jwt");
const message_1 = require("./service/message");
const socket_map = {};
function initSocketIO(server) {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: '*',
            methods: ["GET", "POST"]
        }
    });
    const getSocketIds = () => __awaiter(this, void 0, void 0, function* () {
        const sockets = yield io.fetchSockets();
        const socket_ids = sockets.map(s => s.id);
        return socket_ids;
    });
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (token) {
            const decoded = (0, jwt_1.verifyToken)(token);
            socket.data.email = decoded.email;
            next();
        }
        else {
            next(new Error("Authentication error"));
        }
    });
    io.on('connection', (client) => __awaiter(this, void 0, void 0, function* () {
        const client_email = client.data.email;
        socket_map[client_email] = client;
        client
            .emit('peers', JSON.stringify(Object.keys(socket_map).filter(id => id !== client_email)));
        client
            .broadcast
            .emit('peers', JSON.stringify(Object.keys(socket_map)));
        client.on('msg', (payload) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, message_1.create)(Object.assign(Object.assign({}, payload), { from: client_email }));
                if (Object.keys(socket_map).includes(payload.to)) {
                    client
                        .broadcast
                        .to(socket_map[payload.to].id)
                        .emit('msg', Object.assign(Object.assign({}, payload), { from: client_email }));
                }
            }
            catch (error) {
                console.log('msg event error: ', error);
            }
        }));
        client.on('disconnect', () => __awaiter(this, void 0, void 0, function* () {
            delete socket_map[client_email];
            client
                .broadcast
                .emit('peers', JSON.stringify(Object.keys(socket_map)));
        }));
    }));
    return io;
}
exports.default = initSocketIO;
