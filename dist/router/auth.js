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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_1 = require("../service/jwt");
const user_1 = require("../service/user");
const router = express_1.default.Router();
router.post('/auth/signup', (req, res, nxt) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        res.status(400).send(req.body);
        return;
    }
    try {
        const user = { email: req.body.email };
        const token = (0, jwt_1.generateToken)(user);
        const userData = yield (0, user_1.getByEmail)(user.email);
        if (userData) {
            if (userData.password !== req.body.password) {
                res.status(401).send("Invalid password");
                return;
            }
        }
        else {
            const newUser = yield (0, user_1.create)({ email: req.body.email, password: req.body.password });
        }
        res.send({ token });
    }
    catch (error) {
        nxt(error);
    }
}));
exports.default = router;
