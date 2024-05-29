import React, { useState, useEffect } from 'react';
import Conversation from './Conversation';

export default function Chat({socket, currentConversationId}) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    // const sendMessage = () => {
    //     fetch(`http://127.0.0.1:5000/messages`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ text: message }),
    //     });
    
    //     setMessage("");
    //   };

    useEffect(() => {
        socket.on('message', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.off('message');
        };
    }, [socket]);

    const sendMessage = () => {
        socket.emit("message", { text: message });
        setMessage("");
    };

    return (
      <>
        <div id="messages-container">
          {/* {messages.map((msg, index) => (
            <div key={index} className="message-container">
              <div className="message-text">{msg.text}</div>
            </div>
          ))} */}
          <Conversation currentConversationId={ currentConversationId }/>
        </div>
        <div id="input-container">
            <input type="text" id="message-input" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here..."/>
            <button id="send-button" onClick={sendMessage}>Send <i className="icon-paper-plane"></i> </button>
        </div>
      </>
    )
  }