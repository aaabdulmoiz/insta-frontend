import React, { useState } from "react";
import {
  Button,
  Avatar,
  Modal,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  TextField,
  Grid,
  Divider,
  Paper,
} from "@mui/material";
import Comment from "./Comment";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";

function PhotoModal({
  open,
  handleClose,
  modalContent,
  addComment,
  reactPost,
}) {
  const [inputComment, setInputComment] = useState("");
  const { profile } = useSelector((state) => state.profile);

  const bufferToImage = (image) => {
    let TYPED_ARRAY = new Uint8Array(image);
    const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
    let base64String = btoa(STRING_CHAR);
    return base64String;
  };

  const isLiked = () => {
    //also check if photo.likes includes the userId
    //if yes then run the dislike function
    // otherwise run the like function
    //like: push in modal content, push in redux photo , push in service hit
    //remove: pop in modalcontent, redux photo, service hit

    if (modalContent.likes) {
      if (modalContent.likes.includes(profile.userId)) {
        return "warning";
      } else {
        return "default";
      }
    } else {
      return "default";
    }
  };

  return (
    <div>
      <Modal
        open={open}
        // onClose={() => setOpen(false)}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // style={content}
      >
        <Box>
          <Card sx={style}>
            <Grid container spacing={2} direction="row">
              <Grid container xs={12} md={8} lg={7}>
                <Grid item>
                  <CardMedia
                    src={`data:image/jpeg;base64, ${bufferToImage(
                      modalContent.image.data
                    )}`}
                    component="img"
                  />
                </Grid>
              </Grid>
              <Grid
                container
                item
                xs={12}
                md={8}
                lg={5}
                direction="row"
                // style={{ padding: "10px" }}
                style={{
                  padding: "25px",
                  maxHeight: "300px",
                  minHeight: "210px",
                  overflowY: "auto",
                }}
              >
                <Grid item>
                  <Avatar style={{ marginLeft: 10 }} />
                </Grid>

                <Grid item lg={12}>
                  <CardContent
                    style={
                      {
                        // overflow: "hidden",
                        // overflowY: "scroll",
                      }
                    }
                  >
                    <Typography variant="body2" color="text.secondary">
                      {modalContent.content}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="like" onClick={reactPost}>
                      <Typography fontSize={12} padding={1}>
                        {modalContent.likes ? modalContent.likes.length : "0"}
                      </Typography>{" "}
                      <FavoriteIcon color={isLiked()} />
                    </IconButton>
                    <IconButton aria-label="comment">
                      <Typography fontSize={12} padding={1}>
                        {modalContent.comments
                          ? modalContent.comments.length
                          : "0"}
                      </Typography>{" "}
                      <CommentIcon />
                    </IconButton>
                  </CardActions>
                  <Divider fullWidth />
                  <CardActions>
                    <TextField
                      id="standard-basic"
                      size="small"
                      fullWidth
                      inputProps={{
                        autoComplete: "off",
                        style: { fontSize: 13 },
                      }}
                      label="Comment"
                      variant="standard"
                      onChange={(event) => setInputComment(event.target.value)}
                    />
                    <IconButton
                      aria-label="send"
                      onClick={() => addComment(modalContent._id, inputComment)}
                    >
                      <SendIcon />
                    </IconButton>
                  </CardActions>
                  <CardContent style={{ overflowY: "auto" }}>
                    {modalContent.comments.map((comment) => (
                      <Comment
                        key={modalContent.comments.indexOf(comment)}
                        comment={comment}
                      >
                        {comment.text}
                      </Comment>
                    ))}
                  </CardContent>
                </Grid>
              </Grid>
            </Grid>
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
  width: "75%",
  // height: "65%",
  overflowX: "hidden",
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
};

export default PhotoModal;
