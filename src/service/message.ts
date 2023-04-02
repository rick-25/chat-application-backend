import { Message, User } from '../model'

export async function create( data: { to: string, from: string, data: string } ) {
    const message = await Message.create(data)
    return  message
}

export async function getAll() {
    const messages = await Message.find({})
    return messages
}

export async function getById(id: string) {
    const message = await Message.findById(id)
    return message
}