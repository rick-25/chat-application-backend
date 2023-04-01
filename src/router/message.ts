import { Message } from "../model";
import express from "express";

const router = express.Router()
router.route('/message')
    .get(async (req, res) => {
        const messages = await Message.find({})
        res.send(messages)
    })
export default router
