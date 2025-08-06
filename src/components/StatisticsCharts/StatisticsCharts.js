// src/components/StatisticsCharts.js
import React, { useEffect, useMemo, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Legend, PieChart, Pie, Cell
} from "recharts";
import FullScreenLoader from "../FullScreenLoader/FullScreenLoader";
import { API_URL } from "../../config/api";
import "./StatisticsCharts.css";

const COLORS = [
  "#4caf50", "#2196f3", "#ff9800", "#9c27b0",
  "#03a9f4", "#8bc34a", "#e91e63", "#ff5722",
  "#00bcd4", "#cddc39", "#9e9e9e", "#795548"
];

const StatisticsCharts = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_URL}api/estatisticas`);
        const json = await res.json();
        setStats({
          states: json.por_estado,
          distributors: json.por_distribuidora,
        });
      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const topDistributors = useMemo(() => {
    if (!stats?.distributors) return [];
    return stats.distributors
      .slice()
      .sort((a, b) => b.potencia_total - a.potencia_total)
      .slice(0, 10);
  }, [stats]);


  if (loading) return <FullScreenLoader message="Carregando estatísticas..." />;

  return (
    <div className="charts-container">

      {/* Bar Chart Estados */}
      <div className="chart-box">
        <h2 className="chart-title">Potência Instalada por Estado</h2>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={stats.states}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="potencia_total" fill="var(--primary-color)" radius={[6,6,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Charts Distribuidoras */}
      <div className="chart-box">
        <h2 className="chart-title">Distribuidoras</h2>
        <div className="pie-charts">

          <div>
            <h3 className="chart-subtitle">Top 10</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={topDistributors} dataKey="potencia_total" nameKey="_id" outerRadius={100} label>
                  {topDistributors.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h3 className="chart-subtitle">Distribuidoras (Todas)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={stats.distributors}        
                  dataKey="potencia_total"
                  nameKey="_id"
                  outerRadius={100}
                  label
                >
                  {stats.distributors.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>


        </div>
      </div>

    </div>
  );
};

export default StatisticsCharts;
