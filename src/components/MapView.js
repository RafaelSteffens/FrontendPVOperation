import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

// Ícone customizado usando logo512.png
const CustomIcon = L.icon({
  iconUrl: "/pointer.webp",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

const MapView = ({ coordenadasFiltradas }) => {
  const mapRef = useRef(null);
  const clusterGroupRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Cria o mapa
      mapRef.current = L.map("map", {
        center: [-15.77972, -47.92972],
        zoom: 4,
      });

      // Tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap",
      }).addTo(mapRef.current);

      // Cluster
      clusterGroupRef.current = L.markerClusterGroup({
        chunkedLoading: true,
        maxClusterRadius: 40,
      });
      mapRef.current.addLayer(clusterGroupRef.current);
    }

    // Limpa clusters anteriores
    clusterGroupRef.current.clearLayers();

    // Adiciona novos marcadores
    if (coordenadasFiltradas?.length) {
      coordenadasFiltradas.forEach((coord) => {
        if (coord.lat && coord.lon) {
          const marker = L.marker([coord.lat, coord.lon], { icon: CustomIcon })
            .bindPopup(`<strong>${coord.nome}</strong>`);
          clusterGroupRef.current.addLayer(marker);
        }
      });
    }
  }, [coordenadasFiltradas]);

  return <div id="map" style={{ height: "55vh", width: "100%" }}></div>;
};

export default MapView;
