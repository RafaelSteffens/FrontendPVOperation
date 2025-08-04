import "./Sidebar.css";
import React, { useState } from "react";
import {
  FaChartPie,
  FaMapMarkedAlt,
  FaBolt,
  FaClipboardList,
  FaSync
} from "react-icons/fa";
import { Link } from "react-router-dom"; 
import FullScreenLoader from "../FullScreenLoader/FullScreenLoader";
import { API_URL } from "../../config/api";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const menuItems = [
    { icon: <FaChartPie />, label: "Dashboard", path: "/dashboards" },
    { icon: <FaBolt />, label: "Painel de Operação", path: "/plantlist" },
    { icon: <FaClipboardList />, label: "Painel de gráficos", path: "/graficos" },
  ];

  const handleDatabaseUpdate  = async () => {
    try {
      setIsLoading(true);
      
      const response = await fetch(`${API_URL}/api/aneel/import`);
      if (!response.ok) {
        throw new Error("Falha na requisição");
      }    
      const data = await response.json();  
    } catch (error) {
      console.error("Erro ao atualizar BD:", error);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  return (
    <>
      {isLoading && <FullScreenLoader />}
      
      <div
        className={`sidebar ${expanded ? "expanded" : "collapsed"}`}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <div className="sidebar-logo"><img src="https://plataforma.pvoperation.com/assets/images/logo/logo.png" alt="Logo PV" className="logoPV"></img></div>
        <nav className="sidebar-menu">
          {menuItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.path} 
              className="sidebar-item"
            >
              {item.icon}
              {expanded && <span>{item.label}</span>}
            </Link>
          ))}
          
          <button 
            className={`sidebar-button ${isLoading ? 'loading' : ''}`}
            onClick={handleDatabaseUpdate}
            disabled={isLoading}
          >
            <FaSync className={isLoading ? 'spin' : ''} />
            {expanded && <span>Atualizar BD</span>}
          </button>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;