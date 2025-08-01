import React, { useEffect, useState } from "react";
import { FaSolarPanel, FaBolt } from "react-icons/fa";
import "./DashboardCards.css";

const DashboardCards = () => {
  const [stats, setStats] = useState({
    por_estado: [],
    por_distribuidora: [],
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/estatisticas")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Erro ao carregar estatísticas:", err));
  }, []);

  const totalPotencia =
    [...stats.por_estado, ...stats.por_distribuidora].reduce(
      (acc, item) => acc + (item.potencia_total || 0),
      0
    );

  return (
    <div className="dashboard-cards">
      <h2 className="titulo-secao">Potência por Estado</h2>
      <div className="cards-grid">
        {stats.por_estado.map((estado, i) => {
          const percent = ((estado.potencia_total / totalPotencia) * 100).toFixed(1);
          return (
            <div key={i} className="dashboard-card green">
              <FaSolarPanel className="dashboard-icon" />
              <h3>{estado._id || "Não informado"}</h3>
              <p className="valor">{estado.potencia_total.toFixed(2)} kW</p>
              <span>{percent}% do total</span>
            </div>
          );
        })}
      </div>

      <h2 className="titulo-secao">Potência por Distribuidora</h2>
      <div className="cards-grid">
        {stats.por_distribuidora.map((dist, i) => {
          const percent = ((dist.potencia_total / totalPotencia) * 100).toFixed(1);
          return (
            <div key={i} className="dashboard-card purple">
              <FaBolt className="dashboard-icon" />
              <h3>{dist._id}</h3>
              <p className="valor">{dist.potencia_total.toFixed(2)} kW</p>
              <span>{percent}% do total</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardCards;
