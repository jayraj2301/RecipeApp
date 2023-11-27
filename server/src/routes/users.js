import express from 'express';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import {UserModel} from '../models/Users.js';

const router = express.Router();

router.post("/register", async (req,res)=>{
    const  username = req.body.username;
    const  password = req.body.password;

    // console.log(username);
    const user = await UserModel.findOne({ username })

    if (user) {
        return res.json({message: "Already registered"})
    }

    const hashedpwd = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
        username,
        password: hashedpwd
    })
    await newUser.save();

    res.json({message: "User registered!"});
})


router.post("/login", async (req,res)=>{
    const  {username , password}= req.body;

    const user = await UserModel.findOne({ username })

    if(!user){
        res.json({message:"User does not exist"})
    }

    const ispswValid = await bcrypt.compare(password, user.password);
    if(!ispswValid){
        res.json({message:"Username and Password are wrong"})
    }

    const token = jsonwebtoken.sign({ id:user._id}, "secret");
    res.json({token, userID:user._id});
})

export {router as userRouter};

export const verifyToken = (req,res, next)=>{
    const token = req.headers.authorization;
    if (token) {
        jsonwebtoken.verify(token, "secret", (err) =>{
            if(err) return res.sendStatus(403);
            next();
        })
    }
    else{
        res.sendStatus(401);
    }
}