// src/components/FullScreenLoader.jsx (novo componente)
import React from 'react';
import './FullScreenLoader.css';


const FullScreenLoader = ({ message = "Carregando..." }) => (
  <div className="fullscreen-loader">
    <div className="loader-spinner"></div>
    <p className="loader-text">{message}</p>
  </div>
);

export default FullScreenLoader;