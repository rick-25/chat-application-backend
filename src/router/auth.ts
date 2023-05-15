import express from 'express'
import { generateToken } from '../service/jwt';

const router = express.Router()

router.post('/auth/signup', async (req, res, nxt) => {
    
    if(!req.body.email || !req.body.password) {
        res.status(400).send(req.body)
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