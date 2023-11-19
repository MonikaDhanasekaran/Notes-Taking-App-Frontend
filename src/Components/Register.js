import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import toast from "react-hot-toast";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import axios from "axios";
import "../App.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleSubmit = async (e) => {
    if (
      formData.name === "" &&
      formData.email === "" &&
      formData.password === "" &&
      formData.role === ""
    ) {
      toast("Please Fill All Values", {
        icon: "⛔️",
      });
    } else {
      e.preventDefault();
      const response = await axios.post(
        "https://notes-taking-app-12ne.onrender.com/notes/user/signup",
        {
          ...formData,
        }
      );
      console.log(response);
      toast("Account Created Successfully", {
        icon: "✅",
      });
      navigate("/");
    }
  };

  return (
    <div className="containerRegister">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <PersonIcon sx={{ margin: "10px", fontSize: "30px" }} />
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
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
        <div>
          <FormControl variant="outlined" id="role">
            <InputLabel id="demo-simple-select-filled-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="link">
          Already have an account? <Link to="/">Sign In</Link>
        </div>
        <div className="submit-container-signup">
          <div className="submitSignup" value="Sign up" onClick={handleSubmit}>
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
