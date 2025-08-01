import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
  PieChart, Pie, Cell
} from "recharts";

const COLORS = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff8042",
  "#8dd1e1", "#d0ed57", "#a4de6c", "#d88584",
  "#83a6ed", "#8e44ad", "#27ae60", "#f39c12"
];

const GraficosEstatisticas = () => {
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

  // Tratamento para pegar apenas distribuidoras com maior potência (top 10 por exemplo)
  const distribuidorasTop = [...stats.por_distribuidora]
    .sort((a, b) => b.potencia_total - a.potencia_total)
    .slice(0, 10);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-900 text-white rounded-2xl shadow-lg">
      {/* Gráfico de Barras */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-center">Potência Instalada por Estado</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={stats.por_estado}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="_id" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Legend />
            <Bar dataKey="potencia_total" fill="#4CAF50" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

        {/* Gráficos de Pizza - Distribuidoras */}
        <div className="bg-gray-800 p-4 rounded-xl shadow-md col-span-2">
        <h2 className="text-lg font-semibold mb-6 text-center">Distribuidoras</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top 10 */}
            <div>
            <h3 className="text-md font-medium mb-4 text-center">Top 10 Distribuidoras por Potência</h3>
            <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                <Pie
                    data={distribuidorasTop}
                    dataKey="potencia_total"
                    nameKey="_id"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label
                >
                    {distribuidorasTop.map((_, index) => (
                    <Cell key={`cell-top-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
                </PieChart>
            </ResponsiveContainer>
            </div>

            {/* Todas Distribuidoras */}
            <div>
            <h3 className="text-md font-medium mb-4 text-center">Todas Distribuidoras</h3>
            <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                <Pie
                    data={stats.por_distribuidora}
                    dataKey="potencia_total"
                    nameKey="_id"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label={false}
                >
                    {stats.por_distribuidora.map((_, index) => (
                    <Cell key={`cell-geral-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
                </PieChart>
            </ResponsiveContainer>
            </div>
        </div>
        </div>

    </div>
  );
};

export default GraficosEstatisticas;
