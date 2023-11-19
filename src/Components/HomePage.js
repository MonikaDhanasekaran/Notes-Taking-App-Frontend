import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Box from "@mui/material/Box";
import {
  Grid,
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

const HomePage = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    const response = await axios.get("https://notes-taking-app-12ne.onrender.com/notes/get", {
      headers: {
        accesstoken: localStorage.getItem("token"),
      },
    });
    setNotes(response.data);
  };
  const handleDelete = async (userID) => {
    try {
      const response = await axios.delete(
        `https://notes-taking-app-12ne.onrender.com/notes/delete/${userID}`,
        {
          headers: {
            accesstoken: localStorage.getItem("token"),
          },
        }
      );
      if (response) {
        toast("Notes Deleted Successfully", {
          icon: "✅",
        });
        getNotes();
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const handleAddNotes = () => {
    navigate("/create");
  };
  const handleSearch = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(
        `https://notes-taking-app-12ne.onrender.com/notes/searchNotes/${key}`,
        {
          headers: {
            accesstoken: localStorage.getItem("token"),
          },
        }
      );
      result = await result.json();
      if (result) {
        setNotes(result);
      }
    } else {
      getNotes();
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast("Logout Successfully", {
      icon: "👍🏻",
    });
    navigate("/");
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "black" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontSize: "40px",
                flexGrow: 1,
                color: "white",
                fontFamily: "cursive",
              }}
            >
              Notes
            </Typography>
            <div>
              <SearchIcon sx={{ color: "white", marginLeft: "1390%" }} />
            </div>
            <form className="searchForm">
              <input
                className="searchInput"
                type="search"
                placeholder="Search Notes"
                aria-label="Search"
                onChange={handleSearch}
              />
            </form>
            <Button sx={{ color: "white" }} onClick={handleAddNotes}>
              <AddIcon /> Create Notes
            </Button>
            <Button sx={{ color: "red" }} onClick={handleLogout}>
              <LogoutIcon /> Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid sx={{ marginTop: "5px", marginLeft: "10px" }} container spacing={2}>
        {notes.length &&
          notes.map((row, index) => (
            <Card
              key={index}
              sx={{
                width: "25%",
                marginTop: "13px",
                borderRadius: "20px",
                marginLeft: "10px",
                border: "2px solid black",
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {row.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {row.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ marginLeft: "80px", marginBottom: "20px" }}>
                <Link
                  style={{ fontSize: "20px" }}
                  className="btn btn-link"
                  to={`/updateNotes/${row._id}`}
                >
                  <EditIcon style={{ fontSize: "19px" }} />
                  Edit
                </Link>
                &nbsp;
                <Link
                  style={{ fontSize: "20px", color: "red" }}
                  className="btn btn-link"
                  onClick={() => handleDelete(row._id)}
                >
                  <DeleteIcon style={{ fontSize: "19px", color: "red" }} />
                  Delete
                </Link>
              </CardActions>
            </Card>
          ))}
      </Grid>
    </>
  );
};

export default HomePage;
