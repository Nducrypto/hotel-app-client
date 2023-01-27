import { Link, useNavigate, useLocation } from "react-router-dom";
import "./navbar.css";
import { useAuthContext } from "../../States/Context/AuthContext";
import { useEffect, useState } from "react";
const Navbar = () => {
  const [mode, setMode] = useState(false);
  const navigate = useNavigate();

  const { dispatch, user } = useAuthContext();
  const logout = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
  };

  const location = useLocation();

  useEffect(() => {
    JSON.parse(localStorage.getItem("profile"));
  }, [location]);

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          <span className="logo">Ndubuisi booking App</span>
        </Link>
        {user ? (
          <>
            {user?.result?.username}
            <div>
              {mode ? (
                <span
                  style={{
                    backgroundColor: "red",
                  }}
                >
                  <span>ARE YOU SURE YOU ?</span>
                  <div>
                    <button onClick={logout}>Yes</button>
                    <button onClick={() => setMode(false)}> No</button>
                  </div>
                </span>
              ) : (
                <button onClick={() => setMode(true)}> LOGOUT</button>
              )}
            </div>
          </>
        ) : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
