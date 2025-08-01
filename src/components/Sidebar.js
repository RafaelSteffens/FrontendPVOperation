import "./Sidebar.css";
import React, { useState } from "react";
import {
  FaChartPie,
  FaMapMarkedAlt,
  FaBolt,
  FaClipboardList,
} from "react-icons/fa";

import { Link } from "react-router-dom"; 
import "./Sidebar.css";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

  const menuItems = [
    { icon: <FaChartPie />, label: "Dashboard", path: "/dashboards" },
    { icon: <FaBolt />, label: "Painel de Operação", path: "/plantlist" },
    { icon: <FaClipboardList />, label: "Painel de gráficos", path: "/graficos" },
    { icon: <FaMapMarkedAlt />, label: "Mapa de Operação", path: "/mapview" },
  ];

  return (
    <div
      className={`sidebar ${expanded ? "expanded" : "collapsed"}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="sidebar-logo">PV</div>
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
      </nav>
    </div>
  );
};

export default Sidebar;