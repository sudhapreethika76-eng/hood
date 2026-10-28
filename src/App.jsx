import React from 'react';
import './App.css';
import Home from './components/Home';
import useSmoothScroll from './hooks/useSmoothScroll';

import { HashRouter,Routes,Route } from 'react-router-dom';

function App() {
  // Initialise Lenis smooth scrolling driven by GSAP ticker
  useSmoothScroll();

  return (
    <>
      
       <HashRouter> <Routes>
        <Route path="/" element={<Home/>}/>
        
        
        
        </Routes></HashRouter>
    </>
  );
}

export default App;
