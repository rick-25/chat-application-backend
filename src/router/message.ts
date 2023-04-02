import express from "express";
import { getAll } from "../service/message";

const router = express.Router()
router.route('/message')
    .get(async (req, res, nxt) => {
        try {
            const messages = await getAll()
            res.send(messages)
        } catch (error) {
            nxt(error) 
        }
    })

export default router
