'use client'

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import socketIOClient, { Socket } from 'socket.io-client';

const HomePage: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
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
      console.log('Connected to the server');
    });

    newSocket.on("disconnect", (reason) => {
      console.log('Disconnected from the server', reason);
      if (reason === "io server disconnect") {
        newSocket.connect();
        window.location.href = '/login';
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <>
      <h1>HomePage</h1>
      <Link href="/login">Login</Link>
    </>
  );
}

export default HomePage;
