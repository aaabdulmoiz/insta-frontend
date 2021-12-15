import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import io from "socket.io-client";
import NavBar from "../Components/NavBar";
import ChatBar from "../Components/ChatBar";
import Layout from "../Components/Layout";
import Colors from "../Constants/Colors";
import MessageFeed from "../Components/MessageFeed";
import { TextField, Button, Grid } from "@mui/material";

export default function Privacy() {
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([
    { id: "61891fc5c7deec8a7c90f94d", name: "Bilal Ahsan" },
    { id: "61890d998d25088f9b0be596", name: "Hassan Shah" },
  ]);
  const [recepient, setRecepient] = useState(null);
  const [message, setMessage] = useState({
    message: "",
  });
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: "I'm the recipient! (The person you're talking to)",
    }, // Gray bubble
    {
      id: 0,
      message: "I'm you -- the blue bubbless!",
    }, // Blue bubble
  ]);

  useEffect(() => {
    console.log("checking in useeffect");
    const newSocket = io("http://localhost:5000", {
      transports: ["websocket", "polling", "flashsocket"],
    });
    setSocket(newSocket);

    newSocket.on("send message", function (msg) {
      setMessages((messages) => [...messages, msg]);
    });

    return () => newSocket.close();
  }, []);

  const sendMessage = () => {
    socket.emit("send message", { ...message, id: uuidv4() });
  };

  const setRecepientProfile = (user) => {
    setRecepient(user);
  };

  return (
    <div>
      <NavBar />
      <Layout>
        <ChatBar
          users={users}
          recepient={recepient}
          setRecepientProfile={setRecepientProfile}
        />
        <div>
          <MessageFeed messages={messages} />
        </div>
        <div style={{ padding: 10 }}>
          <Grid container style={{ bottom: 10, position: "fixed" }}>
            <Grid item lg={10} md={8} xs={11} sm={7}>
              <TextField
                fullWidth
                onChange={(e) => setMessage({ message: e.target.value })}
                InputProps={{
                  endAdornment: (
                    <Button
                      style={{ backgroundColor: Colors.primary }}
                      variant="contained"
                      disableElevation
                      onClick={sendMessage}
                    >
                      Send
                    </Button>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </div>
      </Layout>
    </div>
  );
}
