import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
      <main>
          <h1>Hello World</h1>
          <Link href="/home">Home</Link> <br/>
          <Link href="/login">Login</Link> <br/>
          <Link href="/register">Register</Link> <br/>
      </main>
  );
}
