"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import "./Umidade.css";

const Umidade = () => {
  const [valor, setValor] = useState(null);

  const fetchUmidade = async () => {
    try {
      const response = await axios.get("/api/sensores/umidade");
      setValor(response.data.valor);
    } catch (error) {
      console.error("Erro ao buscar umidade", error);
    }
  };

  useEffect(() => {
    fetchUmidade();
    const interval = setInterval(fetchUmidade, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="umidade">
      <span className="umidade-nome">Umidade:</span>

      <div className="umidade-display">
        <Image
          className="umidade-icone"
          src="/icones/umidade.png"
          alt="Umidade"
          width={100}
          height={100}
          priority={true}
        />

        {valor !== null ? (
          <span className="umidade-dados">{valor}<span className="umidade-unidadeDeMedida">%</span></span>
        ) : (
          <span className="umidade-dados-carregando">Carregando...</span>
        )}
      </div>
    </div>
  );
};

export default Umidade;
