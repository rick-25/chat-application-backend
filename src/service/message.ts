import { Message } from '../model'

export async function create( data: { to: string, from: string, data: string } ) {
    const user = await Message.create(data)
    return  user
}

export async function getAll() {
    const users = await Message.find({})
    return users
}

export async function getById(id: string) {
    const user = await Message.findById(id)
    return user
}