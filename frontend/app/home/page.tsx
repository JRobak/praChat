'use client'

import React, { useEffect, useState } from 'react';
import ChatContainer from "../components/chat/ChatContainer";
import socketIOClient, { Socket } from 'socket.io-client';
import FriendsListContainer from "@/app/components/friendsList/FriendsListContainer";

const HomePage: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {

  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 920 && isNavOpen) {
        setIsNavOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isNavOpen]);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
      <div className="min-h-[calc(100vh-1rem)] mx:w-[80%] mg:w-[90%] mx:m-auto mg:m-auto h-[calc(100vh-1rem)] overflow-hidden flex flex-col m-2">
        <header className="text-white p-3">
          <h1>Hi, <b>user#code</b> Welcome to <b>PraChat!</b></h1>
        </header>

        <div className="flex flex-1 overflow-hidden">
          <main
              className={`flex-1 flex flex-col p-4 m-2 bg-gradient-radial rounded-xl border-4 border-gray-800 ${isNavOpen ? 'hidden' : ''}`}>
            <div className="flex m-2 justify-between">
              <span>Chat with name</span>
              <button className="text-white md:hidden mb-4 p-2 rounded" onClick={toggleNav}>
                <i className={'icon-left-open-1'}></i> Friends List
              </button>
            </div>

            <ChatContainer/>

          </main>

          <nav
              className={`w-full md:w-1/3 mf:w-1/4 text-white p-4 md:flex md:flex-col ${isNavOpen ? '' : 'hidden'} md:block bg-gradient-left-top rounded-xl border-4 border-gray-800 m-2`}>
            <div className="flex m-2 justify-between">
              <button className="text-white rounded md:hidden mb-4" onClick={toggleNav}>
                Chat<i className={'icon-right-open'}></i>
              </button>
              <span>Friends List</span>
              <span></span>
            </div>

            <FriendsListContainer/>

          </nav>
        </div>
      </div>
  );
};

export default HomePage;
