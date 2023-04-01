import { User } from "../model";
import express from "express";

const router = express.Router()
router.route('/user')
    .get(async (req, res) => {
        const users = await User.find({})
        res.send(users)
    })
export default router
