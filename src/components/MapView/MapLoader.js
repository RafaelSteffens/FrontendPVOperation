// src/components/MapView/MapLoader.jsx
import React from 'react';
import './MapLoader.css';


const MapLoader = () => (
  <div className="map-loader-overlay" aria-label="Carregando pontos do mapa">
    <div className="loader-spinner"></div>
    <p className="loader-text">Carregando usinas...</p>
  </div>
);

export default MapLoader;