import React from "react";
import { FaBell, FaUserCircle, FaSearch } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1>Dashboard</h1>

      <div className="header-actions">
        <button>Novidades</button>
        <FaSearch />
        <FaBell />
        <FaUserCircle className="user-icon" />
      </div>
    </header>
  );
};

export default Header;
