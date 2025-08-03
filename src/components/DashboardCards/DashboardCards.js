import React, { useEffect, useState, useMemo } from "react";
import { FaSolarPanel, FaBolt } from "react-icons/fa";
import "./DashboardCards.css";
import { API_URL } from "../../config/api";

const DashboardCards = () => {
  const [stats, setStats] = useState({ por_estado: [], por_distribuidora: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/estatisticas`);
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Erro ao carregar estatísticas:", err);
      }
    };
    fetchData();
  }, []);


  // =============================================================================== FAZER ESTE CALCULO NO BACKEND ================================
  const totalPotencia = useMemo(() => {
    return [...stats.por_estado, ...stats.por_distribuidora]
      .reduce((acc, item) => acc + (item.potencia_total || 0), 0);
  }, [stats]);



  const renderCard = (item, type) => {
    const percent = totalPotencia
      ? ((item.potencia_total / totalPotencia) * 100).toFixed(1)
      : 0;

    return (
      <div key={item._id} className={`dashboard-card ${type}`}>
        {type === "green" ? <FaSolarPanel className="dashboard-icon" aria-label="Painel solar"/> : <FaBolt className="dashboard-icon" aria-label="Distribuidora"/>}
        <h3>{item._id || "Não informado"}</h3>
        <p className="valor">{item.potencia_total.toFixed(2)} kW</p>
        <span>{percent}% do total</span>
      </div>
    );
  };


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
