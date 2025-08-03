import React, { useEffect, useState } from "react";
import "./PlantList.css";
import MapView from "../MapView/MapView";
import { API_URL } from "../../config/api";


const PlantList = () => {

  const [plants, setPlants] = useState([]);
  const [filters, setFilters] = useState({
    SigUF: "",
    NomMunicipio: "",
    SigAgente: "",
    NomTitularEmpreendimento: "",
  });
  const [totalFilters, setTotalFilters] = useState({ SigUF: [], NomMunicipio: [], SigAgente: [] });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 50;


  const loadPlants = () => {
    const params = new URLSearchParams({ page, per_page: perPage });
    Object.entries(filters).forEach(([k, v]) => v && params.append(k, v));

    fetch(`${API_URL}/api/usinas?${params}`)
      .then(res => res.json())
      .then(data => {
        setPlants(data.data || []);
        setTotalPages(data.pages || 1);
      })
      .catch(err => console.error("Erro ao carregar usinas:", err));
  };


  const loadFilters = () => {
    const params = new URLSearchParams();
    if (filters.SigUF) params.append("SigUF", filters.SigUF);
    if (filters.NomMunicipio) params.append("NomMunicipio", filters.NomMunicipio);

    fetch(`${API_URL}/api/usinas/filtros?${params}`)
      .then(res => res.json())
      .then(data => setTotalFilters(data))
      .catch(error => console.error("Erro ao carregar filtros:", error));
  };



  useEffect(() => { loadPlants(); }, [filters, page]);
  useEffect(() => { loadFilters(); }, [filters.SigUF, filters.NomMunicipio]);



  const handleFilterChange = e => {
    setPage(1);
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value, ...(name === "SigUF" ? { NomMunicipio: "", SigAgente: "" } : {}), ...(name === "NomMunicipio" ? { SigAgente: "" } : {}) }));
  };


  return (
    <div className="plant-list">
      <h2>🌱 Lista de Usinas</h2>

      <div className="filters">
        <select name="SigUF" value={filters.SigUF} onChange={handleFilterChange}>
          <option value="">Estado</option>
          {totalFilters.SigUF.map(uf => <option key={uf} value={uf}>{uf}</option>)}
        </select>

        <select name="NomMunicipio" value={filters.NomMunicipio} onChange={handleFilterChange} disabled={!filters.SigUF}>
          <option value="">Município</option>
          {totalFilters.NomMunicipio.map(m => <option key={m} value={m}>{m}</option>)}
        </select>

        <select name="SigAgente" value={filters.SigAgente} onChange={handleFilterChange} >
          <option value="">Distribuidora</option>
          {totalFilters.SigAgente.map(a => <option key={a} value={a}>{a}</option>)}
        </select>

        <input
          type="text"
          name="NomTitularEmpreendimento"
          placeholder="Nome do Titular"
          value={filters.NomTitularEmpreendimento}
          onChange={handleFilterChange}
        />
      </div>

      <div className="mapview">
        < MapView filters={filters} />
      </div> 


      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Período</th><th>Município</th><th>Estado</th>
              <th>Distribuidora</th><th>Fonte</th><th>Porte</th>
              <th>Potência (kW)</th><th>Titular</th>
            </tr>
          </thead>
          <tbody>
            {plants.length > 0 ? plants.map((p, i) => (
              <tr key={i}>
                <td>{p.AnmPeriodoReferencia}</td>
                <td>{p.NomMunicipio}</td>
                <td>{p.SigUF}</td>
                <td>{p.SigAgente}</td>
                <td>{p.DscFonteGeracao}</td>
                <td>{p.DscPorte}</td>
                <td>{p.MdaPotenciaInstaladaKW}</td>
                <td>{p.NomTitularEmpreendimento}</td>
              </tr>
            )) : (
              <tr><td colSpan="8" style={{ textAlign: "center" }}>Nenhuma usina encontrada</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>⬅️</button>
        <span>Página {page} de {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>➡️</button>
      </div>
    </div>
  );
};

export default PlantList;
