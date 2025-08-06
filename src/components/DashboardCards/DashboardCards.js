import React, { useEffect, useState } from "react";
import { FaSolarPanel, FaBolt } from "react-icons/fa";
import "./DashboardCards.css";
import { API_URL } from "../../config/api";
import FullScreenLoader from "../FullScreenLoader/FullScreenLoader"; 

const DashboardCards = () => {
  const [stats, setStats] = useState({ por_estado: [], por_distribuidora: [] });
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/estatisticas`);
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Erro ao carregar estatísticas:", err);
      } finally {
        setLoading(false); 
      }
    };
    fetchData();
  }, []);

  const renderCard = (item, type) => {
    return (
      <div key={item._id} className={`dashboard-card ${type}`}>
        {type === "green" ? <FaSolarPanel className="dashboard-icon" aria-label="Painel solar" /> : <FaBolt className="dashboard-icon" aria-label="Distribuidora" />}
        <h3>{item._id || "Não informado"}</h3>
        <p className="valor">{item.potencia_total.toFixed(2)} kW</p>
        <span>{item.percentual}% do total</span>
      </div>
    );
  };

  if (loading) return <FullScreenLoader message="Carregando cards..." />;

  return (
    <div className="dashboard-cards">
      <h2 className="titulo-secao">Potência por Estado</h2>
      <div className="cards-grid">
        {stats.por_estado.map((estado) => renderCard(estado, "green"))}
      </div>

      <h2 className="titulo-secao">Potência por Distribuidora</h2>
      <div className="cards-grid">
        {stats.por_distribuidora.map((distribuidora) => renderCard(distribuidora, "purple"))}
      </div>
    </div>
  );
};

export default DashboardCards;
