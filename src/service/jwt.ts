import jwt from "jsonwebtoken";

const JWT_SECRET = 'secret'

interface PayloadI {
    email: string
}

export function generateToken(payload: PayloadI) {
    return jwt.sign(payload, JWT_SECRET) 
}

export function verifyToken(token: string) {
    return (jwt.verify(token, JWT_SECRET) as PayloadI)
}