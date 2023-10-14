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
exports.getByEmail = exports.getById = exports.getAll = exports.create = void 0;
const model_1 = require("../model");
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield model_1.User.create(data);
        return user;
    });
}
exports.create = create;
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield model_1.User.find({});
        return users;
    });
}
exports.getAll = getAll;
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield model_1.User.findById(id);
        return user;
    });
}
exports.getById = getById;
function getByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield model_1.User.findOne({ email });
        return user;
    });
}
exports.getByEmail = getByEmail;
