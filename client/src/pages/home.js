import axios from 'axios';
import {useEffect, useState} from 'react';
import {getUserID} from '../hooks/getUserID';
import { useCookies } from "react-cookie";

export const Home = () => {

    const [recipes, setRecipe] = useState([]);
    const [savedRecipes, setSavedRecipe] = useState([]);
    
  const [cookies, _] = useCookies(["access_token"]);
    const userID = getUserID();

    useEffect(()=>{
        const fetchRecipe = async ()=>{

            try {
                const response = await axios.get("http://localhost:3001/recipes");
                setRecipe(response.data);

              } catch (err) {
                console.log(err);
              }
        }

        const fetchSavedRecipe = async ()=>{

            try {
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
                setSavedRecipe(response.data.savedRecipes);
                // console.log(response.data);
              } catch (err) {
                console.log(err);
              }
        }
        fetchRecipe();
        if (cookies.access_token) {
            fetchSavedRecipe();
        }
    },[])

    const saveRecipe= async (recipeID)=>{
        

        try {
            const response = await axios.put("http://localhost:3001/recipes",
            { recipeID , userID },
            { headers: {authorization: cookies.access_token} }
            );
            setSavedRecipe(response.data.savedRecipes);

          } catch (err) {
            console.log(err);
          }
    }

    const isRecipeSaved = (id) => savedRecipes.includes(id);

    return <div>
        <h1>Recipes</h1>
        <ul>
            {recipes.map((recipe)=>(
                <li key={recipe._id}>
                    <div>
                        <h2>{recipe.name}</h2>
                        <button 
                        onClick={() => saveRecipe(recipe._id)}
                        disabled={isRecipeSaved(recipe._id)}
                        >
                        {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                        
                        </button>
                    </div>
                    <div className='instructions'>
                        <p>{recipe.instructions}</p>
                    </div>
                    <img src={recipe.imageUrl} alt={recipe.name}/>
                    <p>Cooking Time: {recipe.CookingTime} (minutes)</p>
                </li>
            ))}
        </ul>
    </div>
}