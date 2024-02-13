import express from "express";
import mongoose from "mongoose";
import User from "../models/User";

const usersRouter = express.Router();

usersRouter.get('/', async (req, res, next) => {
    try{
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });
        user.generateToken();
        await user.save();
        return res.send(user);
    }catch (e) {
        if(e instanceof mongoose.Error.ValidationError){
            return res.status(422).send(e);
        }
        next(e)
    }
});
usersRouter.get('/sessions', async (req, res, next) => {
    try{
        const user = await User.findOne({username: req.body.username});
        if(!user){
            return res.status(422).send({error: "Username and/or password is wrong!" });
        }
        const isMatch = await user.checkPassword(req.body.password);

        if(!isMatch){
            return res.status(422).send({error: "Username and/or password is wrong!" });
        }
        user.generateToken();
        await user.save();
        return res.send({message: 'User and password is correct!'})
    }catch (e) {
       next(e);
    }
});
export default usersRouter;