import express from 'express'
import { generateToken } from '../service/jwt';
import { getByEmail, create } from '../service/user';

const router = express.Router()

router.post('/auth/signup', async (req, res, nxt) => {
    
    if(!req.body.email || !req.body.password) {
        res.status(400).send(req.body)
        return;
    }

    try {
        const user = { email: req.body.email } 
        const token = generateToken(user)

        const userData = await getByEmail(user.email)
        if(userData) {
            if(userData.password !== req.body.password) {
                res.status(401).send("Invalid password")
                return;
            }
        } else {
            const newUser = await create({email: req.body.email, password: req.body.password}) 
        }
        
        res.send({ token })
    } catch (error) {
        nxt(error)
    } 
})

export default router