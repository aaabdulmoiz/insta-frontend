import React from "react";
import { Paper, Grid, Avatar } from "@mui/material";

export default function Comment(props) {
  return (
    <div>
      <Paper style={commentStyle}>
        <Grid container spacing={1}>
          <Grid item>
            <Avatar alt="Remy Sharp" />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h6
              style={{
                margin: 0,
                textAlign: "left",
                fontSize: 11,
                height: "10px",
              }}
            >
              {props.comment.author.name}
            </h6>
            <p
              style={{
                textAlign: "left",
                fontSize: 11,
              }}
            >
              {props.children}
            </p>
            <p
              style={{
                textAlign: "left",
                color: "gray",
                fontSize: 11,
                height: "10px",
              }}
            >
              posted 1 minute ago
            </p>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

const commentStyle = {
  padding: "10px 20px",
  marginTop: 2,
  minHeight: "10px",
  width: "90%",
  overflow: "hidden",
};
