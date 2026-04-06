import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import RecipeListPage from "./pages/RecipeListPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import EditRecipePage from "./pages/EditRecipePage";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import AddRecipe from "./components/AddRecipe";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>      
        <Route path="/" element={<HomePage />} />

        <Route
          path="/recipes"
          element={ <IsPrivate> <RecipeListPage /> </IsPrivate> } 
        />

        <Route
          path="/recipes/create"
          element={ <IsPrivate> <AddRecipe /> </IsPrivate> } 
        />

        <Route
          path="/recipes/:recipeId"
          element={ <IsPrivate> <RecipeDetailsPage /> </IsPrivate> }
        />

        <Route
          path="/recipes/edit/:recipeId"
          element={ <IsPrivate> <EditRecipePage /> </IsPrivate> } 
        />
        
        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />

      </Routes>
    </div>
  );
}

export default App;
