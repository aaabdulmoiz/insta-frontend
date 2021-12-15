import React from "react";
import Colors from "../Constants/Colors";

function MessageFeed({ messages }) {
  return (
    <div style={{ padding: 10 }}>
      {messages.map((msg) => (
        <p
          key={msg.id}
          style={{
            backgroundColor: Colors.primary,
            textAlign: "left",
            float: "left",
            clear: "left",
            fontSize: 11,
            color: "white",
            padding: 8,
            borderRadius: 20,
          }}
        >
          {msg.message}
        </p>
      ))}
    </div>
  );
}

// const messageStyle = {
//   backgroundColor: Colors.primary,
//   display:'ini'
//   marginTop: 5,
// };

export default MessageFeed;
