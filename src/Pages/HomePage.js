import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../Constants/Colors";
import { Fab, Snackbar, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Layout from "../Components/Layout";
import NavBar from "../Components/NavBar";
import CreatePostModal from "../Components/CreatePostModal";

function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { profile } = useSelector((state) => state.profile);
  const { auth } = useSelector((state) => state.authenticate);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setOpenSnackMessage] = useState({
    severity: "",
    text: "",
  });
  //alert(auth);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => setModalOpen(false);

  const handleSnackBarClick = (severity) => {
    if (severity === "success") {
      setOpenSnackMessage({
        severity: "success",
        text: "Successfully uploaded.",
      });
    } else {
      setOpenSnackMessage({ severity: "error", text: "Please try again." });
    }
    setOpenSnack(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  return (
    <div>
      <NavBar />
      <Layout>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openSnack}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          key={"top" + "center"}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackMessage.severity}
            sx={{ width: "100%" }}
          >
            {snackMessage.text}
          </Alert>
        </Snackbar>
        <div>
          <h2 style={{ color: Colors.text }}>HomePage</h2>
          {/* <p>The count is: {count}</p> */}
          <p>the profile name is: {profile.name}</p>
          <p>The auth status is: {auth ? "true" : "false"}</p>
          <Fab
            color="secondary"
            aria-label="edit"
            style={{ bottom: 20, right: 20, position: "absolute" }}
            onClick={handleOpen}
          >
            <AddIcon />
          </Fab>
        </div>
        <CreatePostModal
          open={modalOpen}
          handleClose={handleClose}
          handleSnackBarClick={handleSnackBarClick}
        />
      </Layout>
    </div>
  );
}

export default HomePage;
