import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    if (formData.email === "" && formData.password === "") {
      toast("Please Fill All Values", {
        icon: "⛔️",
      });
    } else {
      e.preventDefault();
      try {
        const response = await axios.post(
          "https://notes-taking-app-12ne.onrender.com/notes/user/login",
          {
            ...formData,
          }
        );
        if (response) {
          localStorage.setItem("token", response.data.Token);
          toast("Login Successfully", {
            icon: "😃",
          });
          navigate("/home");
        }
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <EmailIcon sx={{ margin: "10px", fontSize: "30px" }} />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="input">
          <PasswordIcon sx={{ margin: "10px", fontSize: "30px" }} />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <div className="link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
          <br />
          <br />
          <Link className="Link" to="/forgotpassword">
            forgot password?
          </Link>
        </div>
        <div className="submit-container">
          <div className="submit" onClick={handleSubmit} value="Sign In">
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;