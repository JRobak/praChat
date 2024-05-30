import React, { useState, useEffect } from 'react';

export default function Conversation({ socket, currentConversationId }) {
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        socket.on('message', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.off('message');
        };
    }, [socket]);

    return (
        <>
        <div id="conversation-container">
            { currentConversationId }
            {/* {messages.map((msg, index) => (
                <div key={index} className="message-container">
                <div className="message-text">{msg.text}</div>
                </div>
            ))} */}
        </div>
        </>
    )
}