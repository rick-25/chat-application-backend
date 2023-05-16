import express from "express";
import { getAll } from "../service/message";
import { CustomRequst } from "../middlewares/auth";

const router = express.Router()
router.route('/message')
    .get(async (req, res, nxt) => {
        try {
            const messages = await getAll((req as CustomRequst).email)
            res.send(messages)
        } catch (error) {
            nxt(error) 
        }
    })

export default router
