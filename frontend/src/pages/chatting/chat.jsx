import React, { useState, useEffect } from "react";
import Socket from "socket.io-client";

const messageStyle = {
  border: "1px solid black",
  borderRadius: "20px",
  padding: "8px 16px",
  fontSize: "16px",
  maxWidth: "70%",
  wordWrap: "break-word",
  margin: "4px 0",
};

const socket = Socket.io(import.meta.env.VITE_API_URL);

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const msgHandler = (msg) => {
    if (!msg.trim()) return;

    const data = {
      bookingId: "user1",
      senderId: "user2",
      text: msg,
      sender: "me",
    };

    socket.emit("send_message", data);
    setMessages((prev) => [...prev, data]);
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, { ...data, sender: "other" }]);
    });

    return () => {
      socket.off("receive_message");
    };
  });

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="border-2 border-blue-500 bg-blue-500 h-16 relative flex items-center px-4">
        <div className="rounded-[50vw] bg-red-300 h-10 w-10"></div>
        <i className="bi bi-arrow-left ml-auto text-dark fs-2"></i>
      </header>

      {/* Body */}
      <main className="flex-1 overflow-auto p-4 flex flex-col">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              style={{
                ...messageStyle,
                backgroundColor: msg.sender === "me" ? "#DCF8C6" : "#FFF",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="border-t-2 p-2 flex items-center gap-2 h-16">
        <input
          type="text"
          placeholder="Message Here.."
          className="flex-1 h-full border-2 rounded px-4 focus:outline-none"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              msgHandler(message);
            }
          }}
        />
        <button
          className="h-full w-24 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={(e) => {
            msgHandler(message);
          }}
        >
          Send
        </button>
      </footer>
    </div>
  );
}

export default Chat;
