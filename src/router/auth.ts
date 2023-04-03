import express from 'express'
import { create } from '../service/user';
import jwt from 'jsonwebtoken'
import { generateToken } from '../service/jwt';

const router = express.Router()

router.post('/auth/signup', async (req, res, nxt) => {
    if(!req.body.username || !req.body.email || !req.body.password) {
        res.status(400).send('Incomplete detail!')
        return;
    }

    try {
        const user = { email: req.body.email } 
        const token = generateToken(user)
        res.send({ token })
    } catch (error) {
        nxt(error)
    } 
})

export default router