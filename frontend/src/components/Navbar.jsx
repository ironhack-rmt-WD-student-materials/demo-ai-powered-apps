import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav>
      <div className="nav-left">
        <Link to="/">
          <button>Home</button>
        </Link>

        {isLoggedIn && (
          <>
            <Link to="/recipes">
              <button>Recipes</button>
            </Link>
            <Link to="/recipes/create">
              <button>New Recipe</button>
            </Link>
          </>
        )}
      </div>

      <div className="nav-right">
        {isLoggedIn && (
          <>
            <span className="user-email">{user && user.name}</span>
            <button onClick={logOutUser}>Logout</button>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/signup">
              <button>Sign Up</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
