import '../Home.css';
import Chat from './Chat';
import FriendsContainer from './FriendsContainer';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import { getCookie } from './getCookie.js';

export default function Home() {
  const [user, setUser] = useState(null);
  const [userWithCode, setUserWithCode] = useState(null);
  const [socket, setSocket] = useState(null);
  const [currentConversationId, setCurrentConversationId] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const session = getCookie('session');

    if (!session) {
      console.error("Session not found. Please log in again.");
      navigate('/login');
      return;
    }

    fetch(`http://127.0.0.1:5000/check_session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ session: session }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.user_id === null || data.user_id === undefined) {
          navigate('/login');
        } else {
          setUser(data.user_id);
          setUserWithCode(data.user_with_code);
          const newSocket = socketIOClient('http://127.0.0.1:5000');
          setSocket(newSocket);
          newSocket.on("connect", () => {
            // console.log("Connected to server");
            console.log(data.user_id);
            newSocket.emit("login", { id: data.user_id });
          });
        }
      })
      .catch(error => {
        console.error("Error checking session:", error);
        navigate('/login');
      });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [navigate]);

  if (!user || !socket) {
    return <div>Loading...</div>;
  }

  return (
    <div id="home-container">
      <div id="chat-container">
        <Chat socket={socket} currentConversationId={ currentConversationId }/>
      </div>
      <div id="friends-container">
        <FriendsContainer userWithCode={userWithCode} setCurrentConversationId={ setCurrentConversationId }/>
      </div>
    </div>
  );
}
