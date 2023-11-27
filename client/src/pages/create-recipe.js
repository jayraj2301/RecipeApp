import React ,{ useState } from "react";
import axios from 'axios';
import { getUserID } from "../hooks/getUserID";
import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';

export const CreateRecipe = () => {
  const navigate = useNavigate();
  const userID = getUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    CookingTime: 0,
    userOwner: userID,
  });

  const handleChande = (e) => {
    const { name, value } = e.target;
    setRecipe({
      ...recipe,
      [name]: value,
    });
  };

  const handleIngredientChande = (e, ind) => {
    const { value } = e.target;
    const ingredients = recipe.ingredients;
    ingredients[ind] = value;

    setRecipe({
      ...recipe,
      ingredients,
    });
  };

  const addIngredients = (e) => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };
  
  // console.log(recipe);

  const handleSubmit = async(e) =>{
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/recipes",{...recipe},
      {
        headers: { authorization: cookies.access_token }
      }
      );
      alert("Recipe created");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" onChange={handleChande} value={recipe.name}/>

        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, idx) => (
          <input
            key={idx}
            type="text"
            name="ingredient"
            value={ingredient}
            onChange={(e) => {
              handleIngredientChande(e, idx);
            }}
          />
        ))}
        <button onClick={addIngredients} type="button">
          Add Ingredients
        </button>

        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          type="text"
          onChange={handleChande}
          value={recipe.instructions}
        ></textarea>

        <label htmlFor="imageUrl">Image Url</label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="text"
          onChange={handleChande}
          value={recipe.imageUrl}
        />

        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input
          id="CookingTime"
          name="CookingTime"
          type="text"
          onChange={handleChande}
          value={recipe.CookingTime}
        />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};
