import '../Home.css'
import Chat from './Chat';
import FriendsContainer from './FriendsContainer';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
let socket;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export default function Home() {
  const [user, setUser] = useState(null);
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
        body: JSON.stringify({ session: session}),
      })
      .then(response => response.json())
      .then(data => {
        if (data.user === null) {
          navigate('/login');
        } else {
          setUser(data.user);
          socket = socketIOClient('http://127.0.0.1:5000');
          socket.on("connect", () => {
              console.log("Connected to server");
              socket.emit("login", { id: user.id });
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

    return (
      <div id="home-container">
        <div id="chat-container">
          <Chat socket={socket}/>
        </div>
        <div id="friends-container">
          <FriendsContainer/>
        </div>
      </div>
    )
  }