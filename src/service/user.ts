import { User } from '../model'

export async function create( data: { username: string, email: string, password: string } ) {
    const user = await User.create(data)
    return  user
}

export async function getAll() {
    const users = await User.find({})
    return users
}

export async function getById(id: string) {
    const user = await User.findById(id)
    return user
}