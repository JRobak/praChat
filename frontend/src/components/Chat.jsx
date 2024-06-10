import React, { useState, useEffect } from 'react';
import Conversation from './Conversation';
import { getCookie } from './getCookie.js';

export default function Chat({socket, currentConversationId}) {
    const [message, setMessage] = useState("");

    const sendMessage = () => {
        socket.emit("message", { text: message, 'session': getCookie('session'), 'currentConversationId': currentConversationId });
        setMessage("");
    };

    return (
      <>
        <div id="messages-container">
          <Conversation currentConversationId={ currentConversationId } socket={ socket }/>
        </div>
        <div id="input-container">
            <input type="text" id="message-input" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here..."/>
            <button id="send-button" onClick={sendMessage}>Send <i className="icon-paper-plane"></i> </button>
        </div>
      </>
    )
  }