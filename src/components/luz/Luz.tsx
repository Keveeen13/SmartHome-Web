"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import "./Luz.css";

const Luz = ({ dispositivo, alias }) => {
  const [estado, setEstado] = useState(null); // Alterado o estado inicial para null

  const fetchEstado = async () => {
    try {
      const response = await axios.post("/api/dispositivos/estadoAtual", {
        dispositivo,
      });
      setEstado(response.data.estado);
    } catch (error) {
      console.error("Erro ao buscar estado inicial do " + dispositivo, error);
      setEstado(null); // Define o estado como null em caso de erro
    }
  };

  const toggleLuz = async () => {
    try {
      const response = await axios.post("/api/dispositivos/alterarEstado", {
        dispositivo,
      });
      setEstado(response.data.estado);
    } catch (error) {
      console.error("Erro ao alternar estado do " + dispositivo, error);
    }
  };

  useEffect(() => {
    fetchEstado();
    const interval = setInterval(fetchEstado, 50000);
    return () => clearInterval(interval);
  }, []);

  let buttonClass = "btnLuz";

  // Verifica o estado
  if (estado === null) {
    buttonClass += " btnLuz-indisponivel"; // Adiciona a classe luz-unknown se o estado for desconhecido
  } else {
    buttonClass += estado === "1" ? " btnLuz-on" : " btnLuz-off";
  }

  const getImageSrc = () => {
    if (estado === null) {
      return "/icones/lampada-ligada-icone.png";
    } else if (estado === "1") {
      return "/icones/lampada-ligada-icone.png";
    } else {
      return "/icones/lampada-desligada-icone.png";
    }
  };

  return (
    <button className="luz">

      <div
        className={buttonClass}
        onClick={toggleLuz}
        disabled={estado === null} // Desativa o botão se o estado for desconhecido
      >

        <div className="btnLuz-display">

          <Image className="btnLuz-icone"
            src={getImageSrc()}
            width={50}
            height={50}
            alt="Estado da luz"
            property="true"
          />

          <span className="btnLuz-nome">{alias}</span>

          <div className="btnDeslizante">
          <div className="retangulo"><div className="circulo"></div></div>
          </div>
          
          <div className="iconeIndisponivel">
          <Image className="btnLuz-icone"
            src="/icones/indisponivel.png"
            width={50}
            height={50}
            alt="Estado da luz"
            property="true"
          />
          
          </div>
        </div>
      </div>
    </button>
  );
};

export default Luz;
