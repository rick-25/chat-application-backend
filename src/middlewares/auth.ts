import { NextFunction, Request, Response } from "express"
import { verifyToken } from "../service/jwt"
import { JsonWebTokenError, Jwt, JwtPayload } from "jsonwebtoken"

export interface CustomRequst extends Request {
    email: string
}

export async function authenticateToken(req: Request, res: Response, nxt: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    try {
        const payload = verifyToken(token)
        if(!payload) {
            return res.sendStatus(403)
        }

        (req as CustomRequst).email = payload.email

        nxt();
    } catch (error) {
        nxt(error) 
    }

}