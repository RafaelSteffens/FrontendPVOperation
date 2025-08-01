import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardCards from "./components/DashboardCards";
import GraficosEstatisticas from"./components/GraficosEstatisticas";
import PlantList from "./components/PlantList";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        
        <div className="content">
          <Header />
          <main className="main-content">
            <Routes>
              <Route
                path="/dashboards"
                element={
                  <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <DashboardCards />
                  </div>
                }
              />
              <Route
                path="/plantlist"
                element={
                  <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <PlantList />
                  </div>
                }
              />
              <Route
                path="/graficos"
                element={
                  <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <GraficosEstatisticas />
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
