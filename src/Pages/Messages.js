import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import io from "socket.io-client";
import NavBar from "../Components/NavBar";
import Layout from "../Components/Layout";
import { ChatFeed, Message } from "react-chat-ui";
import { useSelector } from "react-redux";
import Colors from "../Constants/Colors";
import { TextField, Button, Grid, responsiveFontSizes } from "@mui/material";
import ChatBar from "../Components/ChatBar";

export default function Messages() {
  const { profile } = useSelector((state) => state.profile);
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState({
    message: "",
  });
  const [users, setUsers] = useState([]);
  const [recepient, setRecepient] = useState(null);
  const [messages, setMessages] = useState([]);
  const recepientRef = useRef();

  useEffect(() => {
    getChatUsers();
    const newSocket = io("http://localhost:5000", {
      transports: ["websocket", "polling", "flashsocket"],
    });
    setSocket(newSocket);
    newSocket.on(profile.userId, (msg) => {
      if (
        msg.recepient === profile.userId &&
        msg.sender === recepientRef.current._id
      ) {
        setMessages((messages) => [...messages, msg]);
      }
    });

    return () => newSocket.close();
  }, []);

  const getChatUsers = async () => {
    try {
      const url = "http://localhost:5000/api/user/chat";
      const resposne = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:3000",
        },
        body: JSON.stringify({
          userId: profile.userId,
        }),
      });
      const res = await resposne.json();
      setUsers(res);
    } catch (err) {
      alert(err.message);
    }
  };

  const sendMessage = () => {
    setMessages((messages) => [...messages, { ...message, id: 0 }]);
    socket.emit("private message", {
      ...message,
      sender: profile.userId,
      recepient: recepient._id,
    });
    setMessage({ message: "" });
  };

  const setRecepientProfile = async (user) => {
    try {
      recepientRef.current = user;
      setRecepient(user);
      setMessages([]);
      //api to retrieve old messages
      const url = "http://localhost:5000/api/chat";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:3000",
        },
        body: JSON.stringify({
          sender: profile.userId,
          recepient: user._id,
        }),
      });
      let res = await response.json();
      if (response.status === 200) {
        res.messages.forEach((message) => {
          if (message.sender === profile.userId) {
            message.id = 0;
          } else {
            message.id = message._id;
          }
        });
        setMessages(res.messages);
      } else {
        alert(res.message);
      }
    } catch (err) {
      alert(err.message);
    }
    // setMessages([]);
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
        {recepient ? (
          <>
            <div style={{ padding: 10 }}>
              <ChatFeed
                messages={messages} // Array: list of message objects
                isTyping={false} // Boolean: is the recipient typing
                hasInputField={false} // Boolean: use our input, or use your own
                showSenderName={false} // show the name of the user who sent the message
                bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
                // JSON: Custom bubble styles
                bubbleStyles={{
                  text: {
                    fontSize: 11,
                  },
                  chatbubble: {
                    borderRadius: 70,
                    padding: 10,
                    backgroundColor: Colors.primary,
                  },
                }}
              />
            </div>
            <div style={{ padding: 10 }}>
              <Grid container style={{ bottom: 10, position: "fixed" }}>
                <Grid item lg={10} md={8} xs={11} sm={7}>
                  <TextField
                    fullWidth
                    onChange={(e) =>
                      setMessage({ ...message, message: e.target.value })
                    }
                    value={message.message}
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
          </>
        ) : (
          <div>Select some one to chat with.</div>
        )}
      </Layout>
    </div>
  );
}
