import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "photos",
  initialState: {
    photos: [],
  },
  reducers: {
    setPhotos: (state, action) => {
      state.photos = action.payload;
    },
    addPostComment: (state, action) => {
      //get index and push into it
      console.log("tedstinf dispatch ", action.payload);
      state.photos.forEach((photo) => {
        if (photo._id === action.payload.postId) {
          photo.comments.push(action.payload.comment);
          return;
        }
      });
    },
    addPostLike: (state, action) => {
      console.log("checking if it works");
      state.photos.forEach((photo) => {
        if (photo._id === action.payload.postId) {
          photo.likes.push(action.payload.userId);
          return;
        }
      });
    },
    deletePostLike: (state, action) => {
      state.photos.forEach((photo) => {
        if (photo._id === action.payload.postId) {
          const index = photo.likes.indexOf(action.payload.userId);
          if (index > -1) {
            photo.likes.splice(index, 1);
          }
          return;
        }
      });
    },
  },
});

export const { setPhotos, addPostComment, addPostLike, deletePostLike } =
  counterSlice.actions;

export default counterSlice.reducer;
