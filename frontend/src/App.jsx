import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from './components/Home'
import LoginContainer from './components/LoginContainer';
import './App.css'
import React, { useEffect } from 'react';

export default function App() {  
  const navigate = useNavigate();
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginContainer />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
