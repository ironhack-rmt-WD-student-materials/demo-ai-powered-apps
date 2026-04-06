import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import { API_URL } from "../../config/api";



function RecipeDetailsPage (props) {
  const [recipe, setRecipe] = useState(null);
  const { recipeId } = useParams();
  
  
  const getRecipe = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');

    // Send the token through the request "Authorization" Headers
    axios
      .get(
        `${API_URL}/api/recipes/${recipeId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        const oneRecipe = response.data;
        setRecipe(oneRecipe);
      })
      .catch((error) => console.log(error));
  };
  
  
  useEffect(()=> {
    getRecipe();
  }, [] );

  
  return (
    <div className="RecipeDetails">
      {recipe && (
        <>
          <h1>{recipe.title}</h1>
          <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
          <p><strong>Description:</strong> {recipe.description}</p>
          <p><strong>Ingredients:</strong></p>
          <ul>
            {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </>
      )}

      <div>
        <Link to="/recipes">
          <button>Back to recipes</button>
        </Link>
            
        <Link to={`/recipes/edit/${recipeId}`}>
          <button>Edit Recipe</button>
        </Link>
      </div>
      
    </div>
  );
}

export default RecipeDetailsPage;
