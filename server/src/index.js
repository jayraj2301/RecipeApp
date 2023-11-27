import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import { userRouter } from './routes/users.js';
import { recipeRouter } from './routes/recipes.js';

const app = express();

app.use(cors()); 
app.use(express.json());

app.use(bodyParser.urlencoded({extended:true}));

app.use("/auth", userRouter);
app.use("/recipes", recipeRouter);

// also we make scripts and in we make start to nodemon : see package.json
// It is use for run src/index.js , we shortcut use npm start

//jyj@6789  : atlas

mongoose.connect("mongodb+srv://Jayraj:jyjx6789@recipes.exwzshv.mongodb.net/recipes");
// server.listen(3001, 'localhost');
app.listen(3001, (req,res)=>{
    console.log("port running");
})