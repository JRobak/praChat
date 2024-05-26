import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

export default function Chat() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const socket = socketIOClient('http://127.0.0.1:5000');
        socket.on("message", (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        fetch(`http://127.0.0.1:5000/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: message }),
        });
    
        setMessage("");
      };

    return (
      <>
        <div id="messages-container"></div>
        <div id="input-container">
            <input type="text" id="message-input" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here..."/>
            <button id="send-button" onClick={sendMessage}>Send <i className="icon-paper-plane"></i> </button>
        </div>
      </>
    )
  }