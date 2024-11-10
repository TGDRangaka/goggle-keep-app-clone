import express from 'express';
import { UserService } from '../services/userService';

const userRouter = express.Router();

userRouter.get('/health', (req, res) => {
    res.send('User route is working');
})

userRouter.post('/', async (req, res) => {
    // save user
    try{
        const user = await UserService.login(req.body);
        res.status(201).json({
            success: true,
            data: user
        });
    }catch(err: any) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
})

export default userRouter;