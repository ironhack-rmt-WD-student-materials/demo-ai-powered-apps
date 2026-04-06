import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import RecipeCard from "../components/RecipeCard";

import { API_URL } from "../../config/api";


function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);

  const getAllRecipes = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/api/recipes`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setRecipes(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllRecipes();
  }, []);


  return (
    <div className="RecipeListPage">
      {recipes.length === 0 ? (
        <div className="empty-state">
          <p>You haven't created any recipes yet. Let's get cooking!</p>
          <Link to="/recipes/create">
            <button>Create Your First Recipe</button>
          </Link>
        </div>
      ) : (
        recipes.map((recipe) => (
          <RecipeCard key={recipe._id} {...recipe} />
        ))
      )}
    </div>
  );
}

export default RecipeListPage;
