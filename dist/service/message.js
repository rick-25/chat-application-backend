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
exports.getById = exports.getAll = exports.create = void 0;
const model_1 = require("../model");
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const message = yield model_1.Message.create(data);
        return message;
    });
}
exports.create = create;
function getAll(email) {
    return __awaiter(this, void 0, void 0, function* () {
        let messages;
        if (email) {
            messages = yield model_1.Message.find({ $or: [{ to: email }, { from: email }] });
        }
        else {
            messages = yield model_1.Message.find({});
        }
        return messages;
    });
}
exports.getAll = getAll;
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const message = yield model_1.Message.findById(id);
        return message;
    });
}
exports.getById = getById;
