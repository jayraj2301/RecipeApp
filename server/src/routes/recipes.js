import express from 'express';
import {RecipeModel} from '../models/Recipe.js';
import mongoose from 'mongoose';
import { UserModel } from '../models/Users.js';
import { verifyToken } from './users.js';

const router = express.Router();

router.get("/", async(req,res)=>{
    try {
        const response = await RecipeModel.find({});
        res.json(response)
    } catch (err) {
        res.json(err);
    }
})

router.post("/", verifyToken, async(req,res)=>{
    const recipe = new RecipeModel(req.body);
    try {
        await recipe.save();;
        res.json(recipe)
    } catch (err) {
        res.json(err);
    }
})

router.put("/",verifyToken, async(req,res)=>{
    
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);

        user.savedRecipes.push(recipe);

        await user.save();
        res.json({savedRecipes: user.savedRecipes})
    } catch (err) {
        res.json(err);
    }
})

router.get("/savedRecipes/ids/:userID", verifyToken, async(req,res)=>{
    
    try {
        const user = await UserModel.findById(req.params.userID);

        res.json({savedRecipes: user?.savedRecipes});
    } catch (err) {
        res.json(err);
    }
})

router.get("/savedRecipes/:userID",verifyToken, async(req,res)=>{
    
    try {
        const user = await UserModel.findById(req.params.userID);
        const savedRecipes = await RecipeModel.find({
            _id: { $in: user.savedRecipes }
        })


        res.json({savedRecipes});
    } catch (err) {
        res.json(err);
    }
})

export {router as recipeRouter}; 
