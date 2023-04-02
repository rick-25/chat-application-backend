import express from "express";
import { getAll } from '../service/user'

const router = express.Router()

router.route('/user')
    .get(async (req, res, nxt) => {
        try {
            const users = await getAll()
            res.send(users)
        } catch (error) {
            nxt(error)
        }
    })

export default router
