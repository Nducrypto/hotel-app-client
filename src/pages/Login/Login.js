import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../States/Context/AuthContext";

const initialState = {
  username: "",
  password: "",
};
const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const { user, loading, error, dispatch } = useAuthContext();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        { ...formData }
      );
      console.log(data);
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };
  console.log(user);

  return (
    <div>
      <input
        id="username"
        value={formData.username}
        placeholder="username or email"
        onChange={handleChange}
      />
      <input
        id="password"
        valuse={formData.password}
        placeholder="password"
        onChange={handleChange}
      />
      <button disabled={loading} onClick={handleClick}>
        submit
      </button>
      {error && <span>{error.message}</span>}
    </div>
  );
};

export default Login;
