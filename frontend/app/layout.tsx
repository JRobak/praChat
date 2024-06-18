'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../public/fontello/css/fontello.css";
import React, {useEffect} from "react";
import {chatSocket} from "@/api";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    useEffect(() => {
        chatSocket.connect();
        return () => {chatSocket.disconnect()}
    }, [])

  return (
    <html lang="en">
      <head>
          <link rel="icon" href="/duck_icon.png"/>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
