import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CreateNotes = () => {
  const navigate = useNavigate();
  const [addNotes, setAddNotes] = useState({
    title: "",
    description: "",
  });

  const handleInput = (value) => {
    return setAddNotes((data) => {
      return { ...data, ...value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "https://notes-taking-app-12ne.onrender.com/notes/create",
      addNotes,
      {
        headers: {
          accesstoken: localStorage.getItem("token"),
        },
      }
    );
    if (response) {
      setAddNotes({
        title: "",
        description: "",
      });
      toast("Notes Created Successfully", {
        icon: "😃",
      });
      navigate("/home");
    }
    setAddNotes(response.data);
  };
  const handleBack = () => {
    navigate("/home");
  };
  return (
    <div id="notes">
      <Button
        sx={{
          color: "white",
          marginLeft: "90%",
          marginTop: "10px",
          backgroundColor: "black",
          borderRadius: "50px",
          padding: "10px"
        }}
        onClick={handleBack}
      >
        <ArrowBackIcon />
        Back
      </Button>
      <Grid container>
        <Card
          sx={{
            margin: "10px",
            marginLeft: "35%",
            marginTop: "7%",
            borderRadius: "40px",
            padding: "20px",
          }}
        >
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Typography
                variant="h4"
                component="div"
                sx={{ fontFamily: "cursive", textAlign: "center" }}
              >
                Add Notes
              </Typography>
              <br />
              <div>
                <TextField
                  sx={{ width: "100%" }}
                  type="text"
                  name="name"
                  label="Title"
                  value={addNotes.title}
                  onChange={(e) => handleInput({ title: e.target.value })}
                />
              </div>
              <br />
              <div>
                <label>
                  Description:
                  <br />
                  <br />
                  <textarea
                    style={{ fontSize: "15px" }}
                    name="description"
                    rows={8}
                    cols={40}
                    value={addNotes.description}
                    onChange={(e) =>
                      handleInput({ description: e.target.value })
                    }
                  />
                </label>
              </div>
              <br />
              <Button
                variant="contained"
                type="submit"
                onClick={handleSubmit}
                sx={{
                  width: "50%",
                  backgroundColor: "#3c009d",
                  marginLeft: "90px",
                  borderRadius: "20px",
                  height: "40px"
                }}
              >
                Add
              </Button>
              <br />
              <br />
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default CreateNotes;
