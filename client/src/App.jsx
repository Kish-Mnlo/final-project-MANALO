import { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Navbar from './Navbar'
import Home from './pages/Home'
import Artworks from './pages/Artworks'
import Commission from './pages/Commission'
import Contact from './pages/Contact'
import Footer from './Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artworks" element={<Artworks />} />
          <Route path="/commission" element={<Commission />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}
