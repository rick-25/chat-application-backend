import { Message } from '../model'

export async function create( data: { to: string, from: string, data: string } ) {
    const message = await Message.create(data)
    return  message
}

export async function getAll(email: string | undefined) {
    let messages;
    if(email) {
        messages = await Message.find({ $or: [{ to: email }, { from: email }]})
    } else {
        messages = await Message.find({})
    }
    return messages
}

export async function getById(id: string) {
    const message = await Message.findById(id)
    return message
}