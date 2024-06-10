import '../Home.css';
import Chat from './Chat';
import FriendsContainer from './FriendsContainer';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import { getCookie } from './getCookie.js';
import duck from '../assets/duck.png';

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
      credentials: 'include', 
    })
      .then(response => response.json())
      .then(data => {
        if (!data.user_id) {          
          document.cookie = "session=";
          navigate('/login');
        } else {
          setUser(data.user_id);
          setUserWithCode(data.user_with_code);

          const newSocket = socketIOClient('http://127.0.0.1:5000', {
            transports: ['websocket'], 
            upgrade: true,
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            timeout: 20000, 
            withCredentials: true, 
          });
          
          setSocket(newSocket);

          newSocket.on("connect", () => {
            console.log(`Connected to server with user ID: ${data.user_id}`);
            newSocket.emit("login", { id: data.user_id });
          });

          newSocket.on("disconnect", (reason) => {
            if (reason === "io server disconnect") {
              newSocket.connect();
            }
          });

          return () => {
            newSocket.disconnect();
          };
        }
      })
      .catch(error => {
        console.error("Error checking session:", error);
        navigate('/login');
      });
  }, [navigate]);

  if (!user || !socket) {
    return <div>Loading...</div>;
  }

  return (
    <div id="home-container">
      <div id="chat-container" className={currentConversationId === 0 ? "chat-box-with-gradient" : "chat-box-without-gradient"}>
        {currentConversationId > 0 && <Chat socket={socket} currentConversationId={currentConversationId} />}
        {currentConversationId === 0 && (
          <>
            <div id="chat_duck">
              <img src={duck} alt="duck" />
            </div>
            <div id="chat_duck_text">Hi, <b>{userWithCode}</b> Welcome to <b>PraChat!</b> To start a conversation select a friend from the list on the right. At the bottom, you can use the form to add a new friend - make sure to include <b>#&lt;code&gt;</b> after username</div>
          </>
        )}
      </div>
      <div id="friends-container">
        <FriendsContainer userWithCode={userWithCode} setCurrentConversationId={setCurrentConversationId} />
      </div>
    </div>
  );
}
