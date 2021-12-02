import React, { useState } from "react";
import Colors from "../Constants/Colors";
import {
  Modal,
  Box,
  Card,
  Grid,
  TextField,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import axios from "axios";

export default function CreatePostModal({
  open,
  handleClose,
  handleSnackBarClick,
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState("");

  const selectImage = (event) => {
    console.log(event.target.files[0].type);
    if (event.target.files[0].type.split("/")[0] !== "image") {
      return alert("The file you selected is not an image.");
    } else {
      setSelectedImage(event.target.files[0]);
    }
  };

  const closeModal = () => {
    setSelectedImage(null);
    handleClose();
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append("userId", "6183ce9ea7b8054ec22a1e48");
    data.append("content", caption);
    data.append("image", selectedImage);
    axios
      .post("http://localhost:5000/api/posts/", data)
      .then((res) => {
        closeModal();
        handleSnackBarClick("success");
      })
      .catch((err) => handleSnackBarClick("error"));
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Card style={style}>
            <Stack spacing={5}>
              <Typography variant="h6">Create Post</Typography>
              <Grid container spacing={0} direction="row">
                <Grid item xs={12} md={12} lg={12}>
                  <TextField
                    label="Caption"
                    variant="outlined"
                    fullWidth={true}
                    multiline
                    onChange={(event) => setCaption(event.target.value)}
                  ></TextField>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  {selectedImage && (
                    <div>
                      <img
                        alt="not found"
                        width={"250px"}
                        src={URL.createObjectURL(selectedImage)}
                      />
                      <br />
                    </div>
                  )}
                  <br />
                  <input type="file" name="myImage" onChange={selectImage} />
                </Grid>

                <Grid container style={{ marginTop: 10 }}>
                  <Grid item xs={6} md={6} lg={6}>
                    <Button
                      disableElevation
                      variant="contained"
                      style={{
                        backgroundColor: Colors.primary,
                        color: "#FFFFFF",
                        width: "100px",
                      }}
                      onClick={uploadImage}
                    >
                      Create
                    </Button>
                    <Button
                      disableElevation
                      variant="contained"
                      style={{
                        marginLeft: "10px",
                        backgroundColor: Colors.primary,
                        color: "#FFFFFF",
                        width: "100px",
                      }}
                      onClick={closeModal}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Stack>
          </Card>
        </Box>
      </Modal>
    </div>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  padding: "30px",
  // height: "65%",
  overflowX: "hidden",
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
};
