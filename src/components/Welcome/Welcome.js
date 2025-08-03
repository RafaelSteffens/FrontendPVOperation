import React from "react";
import { motion } from "framer-motion";
import "./Welcome.css";

const Welcome = () => {
  return (
    <div className="welcome-container">
      <motion.img
        src="/RafaelSteffens.png"
        alt="Rafael Steffens"
        className="welcome-image"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      />

      <motion.h2
        className="welcome-subtitle"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Olá! Sou <span className="highlight">Rafael Steffens</span>, pronto para somar ao time da{" "}
        <span className="highlight-alt">PVOperation</span>.
      </motion.h2>

      <motion.div
        className="welcome-card"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <h3 className="card-title">O que entrego ao seu time:</h3>
        <ul className="card-list">
          <li>⚡ Soluções <span>Fullstack escaláveis</span> com foco em performance real</li>
          <li>🤝 Visão de produto, <span>trabalho em equipe</span> e agilidade nas entregas</li>
          <li>🎯 Comprometimento com <span>resultado, inovação e qualidade</span></li>
          <li>🌐 Experiência sólida com <span>React, Flask, SQL e integrações modernas</span></li>
        </ul>
      </motion.div>

      <motion.p
        className="welcome-quote"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        “Mais do que código, entrego soluções que geram valor e impacto real no negócio.”
      </motion.p>
    </div>
  );
};

export default Welcome;
