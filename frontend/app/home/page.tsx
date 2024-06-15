import React from 'react'
import Link from "next/link";

const HomePage = () => {
    return (
        <>
            <h1>HomePage</h1>
            <Link href="/login">Login</Link>
        </>
    )
}

export default HomePage