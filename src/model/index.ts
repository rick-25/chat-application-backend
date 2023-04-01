import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://aditya:123@cluster0.o7fng.mongodb.net/temp?retryWrites=true&w=majority"

mongoose.connect(MONGO_URL)
        .catch(err => console.log(err))

const userSchema = new mongoose.Schema({
    email: 'string',
    password: 'string',
    username: 'string'
})

const messageSchema = new mongoose.Schema({
    data: 'string',
    to: 'string',
    from: 'string'
})

export const User = mongoose.model('User', userSchema)
export const Message = mongoose.model('Message', messageSchema)