"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import "./Temperatura.css";

const Temperatura = () => {
  const [valor, setValor] = useState(null);

  const fetchTemperatura = async () => {
    try {
      const response = await axios.get("/api/sensores/temperatura");
      setValor(response.data.valor);
    } catch (error) {
      console.error("Erro ao buscar temperatura", error);
    }
  };

  useEffect(() => {
    fetchTemperatura();
    const interval = setInterval(fetchTemperatura, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="temperatura">
      <span className="temperatura-nome">Temperatura:</span>

      <div className="temperatura-display">
        <Image
          className="temperatura-icone"
          src="/icones/termometro.png"
          alt="Termômetro"
          width={100}
          height={100}
          priority={true}
        />

        {valor !== null ? (
          <span className="temperatura-dados">{valor}</span>
        ) : (
          <span className="temperatura-dados-carregando">Carregando...</span>
        )}
      </div>
    </div>
  );
};

export default Temperatura;
