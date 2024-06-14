import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {getCookie} from "./getCookie.js";

export default function Conversation({ socket, currentConversationId }) {
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');

    function getUsername(currentConversationId)  {
        fetch('http://127.0.0.1:5000/get_users_name_by_conversation_id', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'currentConversationId': currentConversationId, 'session': getCookie('session')}),
        })
        .then(response => response.json())
        .then(data => { setUsername(data.username); })
        .catch(error => { console.error('Error getting username:', error); });
    }

    useEffect(() => {
        if (currentConversationId) {
            getUsername(currentConversationId);

            axios.post('http://127.0.0.1:5000/get_messages', { conversation_id: currentConversationId })
                .then(response => {
                    setMessages(response.data);
                })
                .catch(error => {
                    console.error('Error fetching messages:', error);
                });
        }
    }, [currentConversationId]);

    useEffect(() => {
        const handleMessage = (newMessage) => {
            if (newMessage.conversation_id === currentConversationId) {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            }
        };

        socket.on('message', handleMessage);

        return () => {
            socket.off('message', handleMessage);
        };

    }, [socket, currentConversationId]);

    useEffect(() => {
        const chatContainer = document.getElementById('conversation-container');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [messages]);

    return (
        <div id="conversation-container">
            <h2>{username}</h2>
            {messages.map((msg, index) => (
                <div key={index} className="message-container">
                    <div className="message-date">{new Date(msg.date_and_hour).toLocaleString()}</div>
                    <div className="message-text"><span className={username === msg.user ? "message-user" : null}>{msg.user}:</span> {msg.message}</div>
                </div>
            ))}
        </div>
    );
}
