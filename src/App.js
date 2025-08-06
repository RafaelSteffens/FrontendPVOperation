import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Welcome from "./components/Welcome/Welcome";


import PlantList from "./components/PlantList/PlantList";
const DashboardCards = lazy(() => import("./components/DashboardCards/DashboardCards"));
const StatisticsCharts = lazy(() => import("./components/StatisticsCharts/StatisticsCharts"));


function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="content">
          <Header />
          <main className="main-content">
            <Suspense fallback={<div>Carregando...</div>}>

              <Routes>            
                <Route
                  path="/"
                  element={
                    <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                      <Welcome />
                    </div>
                  }
                />
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
                      <StatisticsCharts />
                    </div>
                  }
                />
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
