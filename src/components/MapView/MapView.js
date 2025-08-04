import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.glify";
import MapLoader from "./MapLoader";
import { API_URL } from "../../config/api";

const MapView = ({ filters }) => {
  const mapRef = useRef(null);
  const glifyLayerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map", {
        center: [-15.77972, -47.92972],
        zoom: 4,
        preferCanvas: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap",
      }).addTo(mapRef.current);
    }
  }, []);

useEffect(() => {
  if (!mapRef.current) return;

  const fetchCoordinates = async () => {
    try {
      setIsLoading(true);
      
      const queryParams = new URLSearchParams();
      if (filters?.SigUF) queryParams.append("SigUF", filters.SigUF);
      if (filters?.NomMunicipio) queryParams.append("NomMunicipio", filters.NomMunicipio);
      if (filters?.SigAgente) queryParams.append("SigAgente", filters.SigAgente);
      if (filters?.NomTitularEmpreendimento) queryParams.append("NomTitularEmpreendimento", filters.NomTitularEmpreendimento);

      const url = `${API_URL}/api/CoordUsinas?${queryParams.toString()}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Erro ao buscar coordenadas");

      const coordsArray = await response.json();

      if (!Array.isArray(coordsArray) || coordsArray.length === 0) {
        console.error("Nenhuma coordenada válida recebida");
        return;
      }


      const validPoints  = coordsArray
      .filter(item => 
        Array.isArray(item) && item.length === 2 &&
        item.every(n => typeof n === "number" && !isNaN(n)) &&
        item[0] >= -180 && item[0] <= 180 &&
        item[1] >= -90 && item[1] <= 90
        ).map(item => [item[1], item[0]]); 


      if (glifyLayerRef.current) {
        glifyLayerRef.current.remove();
        glifyLayerRef.current = null;
      }

      glifyLayerRef.current = L.glify.points({
        map: mapRef.current,
        data: validPoints ,
        size: 10,
        color: { r: 0.035, g: 0.302, b: 0.208, a: 1 },
        click: (e, point) => {
          L.popup()
            .setLatLng(point) 
            .openOn(mapRef.current);
        },
      });
    } catch (error ) {
      console.error("Erro no fetch:", error );
    } finally {
      setIsLoading(false); 
    }
  };

  fetchCoordinates();
}, [filters]);


  return (
    <div className="map-container" style={{ position: 'relative' }}>
      {isLoading && <MapLoader />}
      <div id="map" style={{ height: "55vh", width: "100%" }} />
    </div>

  );
};

export default MapView;
