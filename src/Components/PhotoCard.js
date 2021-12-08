import React, { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  Button,
  CardActions,
  Typography,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";

function PhotoCard({ photo, handleOpen }) {
  const { profile } = useSelector((state) => state.profile);

  const bufferToImage = (image) => {
    let TYPED_ARRAY = new Uint8Array(image);
    const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
    let base64String = btoa(STRING_CHAR);
    return base64String;
  };

  const isLiked = () => {
    if (photo.likes) {
      if (photo.likes.includes(profile.userId)) {
        return "warning";
      } else {
        return "default";
      }
    } else {
      return "default";
    }
  };

  // const photoBufferOrUrl =

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={3}
      align="center"
      key={photo._id}
      onClick={handleOpen}
    >
      <Card sx={{ maxWidth: 350, height: 250 }}>
        {photo.image_url ? (
          <CardMedia
            component="img"
            height="200"
            width="180"
            src={photo.image_url}
            alt="green iguana"
          />
        ) : (
          <CardMedia
            component="img"
            height="200"
            width="180"
            src={`data:image/jpeg;base64, ${bufferToImage(photo.image.data)}`}
            alt="green iguana"
          />
        )}
        <CardActions>
          <IconButton size="small" color="default">
            <Typography fontSize={12} padding={1}>
              {photo.comments ? photo.comments.length : "0"}{" "}
            </Typography>{" "}
            <CommentIcon />
          </IconButton>
          <IconButton size="small">
            <Typography fontSize={12} padding={1}>
              {photo.likes ? photo.likes.length : "0"}
            </Typography>
            <FavoriteIcon color={isLiked()} />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default PhotoCard;
