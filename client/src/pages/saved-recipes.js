import axios from 'axios';
import {useEffect, useState} from 'react';
import {getUserID} from '../hooks/getUserID';

export const SavedRecipes = () => {

    const [savedRecipes, setSavedRecipe] = useState([]);
    const userID = getUserID();

    useEffect(()=>{
        const fetchSavedRecipe = async ()=>{

            try {
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);
                setSavedRecipe(response.data.savedRecipes);
                // console.log(response.data);
              } catch (err) {
                console.log(err);
              }
        }
        fetchSavedRecipe();
    },[])

   

    return <div>
        <h1>Saved Recipes</h1>
        <ul>
            {savedRecipes.map((recipe)=>(
                <li key={recipe._id}>
                    <div>
                        <h2>{recipe.name}</h2>
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