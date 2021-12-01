import React, { useState, useEffect } from "react";
import PhotoCard from "../Components/PhotoCard";
import PhotoModal from "../Components/PhotoModal";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Colors from "../Constants/Colors";
import NavBar from "../Components/NavBar";
import Layout from "../Components/Layout";
import { useSelector, useDispatch } from "react-redux";
import {
  setPhotos,
  addPostComment,
  addPostLike,
  deletePostLike,
} from "../redux/photos";

function Feed() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    image: {},
    postId: "",
    isFavorite: false,
    comments: [],
    likes: [],
  });
  const { profile } = useSelector((state) => state.profile);
  const { photos } = useSelector((state) => state.photos);
  const dispatch = useDispatch();

  useEffect(() => {
    getFeedPhotos();
  }, []);

  const getFeedPhotos = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "GET",
      });
      const res = await response.json();
      dispatch(setPhotos(res));
      console.log("the posts are ", res);
    } catch (err) {
      console.log("the err is ", err);
    }
  };

  const handleOpen = (photo) => {
    setModalContent({ ...photo, postId: photo._id });
    setModalOpen(true);
  };

  const handleClose = () => setModalOpen(false);

  const addComment = async (postId, text) => {
    const url = "http://localhost:5000/api/comment";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:3000",
        },
        body: JSON.stringify({
          postId: postId,
          userId: profile.userId,
          text: text,
        }),
      });
      const res = await response.json();
      let comment = [...modalContent.comments];
      comment.push(res);
      setModalContent({ ...modalContent, comments: comment });
      dispatch(addPostComment({ postId: postId, comment: res }));
    } catch (err) {
      alert(err.message);
    }
  };

  const reactPost = async () => {
    if (modalContent.likes) {
      if (modalContent.likes.includes(profile.userId)) {
        //dislike api
        dislikePost();
      } else {
        //hit like api
        likePost();
      }
    }
  };

  const likePost = async () => {
    try {
      console.log("the post id is ", modalContent.postId);
      const url = "http://localhost:5000/api/posts/like";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:3000",
        },
        body: JSON.stringify({
          postId: modalContent.postId,
          userId: profile.userId,
        }),
      });
      const res = await response.json();
      const likes = [...modalContent.likes];
      likes.push(profile.userId);
      setModalContent({ ...modalContent, likes: [...likes] });
      dispatch(
        addPostLike({ postId: modalContent.postId, userId: profile.userId })
      );
    } catch (err) {
      alert(err.message);
    }
  };

  const dislikePost = async () => {
    try {
      console.log("the post id is ", modalContent.postId);
      const url = "http://localhost:5000/api/posts/like";
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:3000",
        },
        body: JSON.stringify({
          postId: modalContent.postId,
          userId: profile.userId,
        }),
      });
      const res = await response.json();
      const likes = [...modalContent.likes];
      const index = modalContent.likes.indexOf(profile.userId);
      if (index > -1) {
        likes.splice(index, 1);
        setModalContent({ ...modalContent, likes: [...likes] });
        dispatch(
          deletePostLike({
            postId: modalContent.postId,
            userId: profile.userId,
          })
        );
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <NavBar />
      <Layout>
        {/* <ResponsiveDrawer> */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Typography>Lets check</Typography>
          <h2 style={{ color: Colors.text }}>Feed</h2>

          <Grid container spacing={3} justify="center" alignItems="center">
            {photos.map((photo) => (
              <PhotoCard
                key={photo._id}
                photo={photo}
                handleOpen={() => handleOpen(photo)}
              />
            ))}
          </Grid>
        </Box>
        <PhotoModal
          open={modalOpen}
          handleClose={handleClose}
          modalContent={modalContent}
          addComment={addComment}
          reactPost={reactPost}
        />
      </Layout>
      {/* </ResponsiveDrawer> */}
    </div>
  );
}

export default Feed;
