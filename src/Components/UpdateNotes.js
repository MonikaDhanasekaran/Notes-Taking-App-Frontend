import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
  Button,
} from "@mui/material";

const UpdateNotes = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dataID = params.dataID.toString();
  const [updateNotes, setUpdateNotes] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    axios
      .get(`https://notes-taking-app-12ne.onrender.com/notes/getOne/${dataID}`, {
        headers: {
          accesstoken: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setUpdateNotes(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, [dataID]);

  const handleInput = (value) => {
    return setUpdateNotes((data) => {
      return {
        ...data,
        ...value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://notes-taking-app-12ne.onrender.com/notes/update/${dataID}`,
        updateNotes,
        {
          headers: {
            accesstoken: localStorage.getItem("token"),
          },
        }
      );
      if (response) {
        setUpdateNotes({
          title: "",
          description: "",
        });
        toast("Notes Updated Successfully", {
          icon: "😃",
        });
        navigate("/home");
      }
    } catch (error) {
      console.log("Error:", error);
    }
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
          padding: "10px",
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
                Update Notes
              </Typography>
              <br />
              <div>
                <TextField
                  sx={{ width: "100%" }}
                  type="text"
                  name="name"
                  label="Title"
                  value={updateNotes.title}
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
                    value={updateNotes.description}
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
                  height: "40px",
                }}
              >
                Update
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

export default UpdateNotes;
