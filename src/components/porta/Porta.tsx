'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import "./Porta.css";

const Porta = ({ dispositivo, ambiente, andar, alias }) => {
  const [estado, setEstado] = useState(null); // Alterado o estado inicial para null

  const tipo = "Porta";

  const fetchEstado = async () => {
    try {
      const response = await axios.post("/api/dispositivos/estadoAtual", {
        dispositivo, ambiente, andar, tipo
      });
      setEstado(response.data.estado);
    } catch (error) {
      console.error("Erro ao buscar estado inicial do " + dispositivo, ambiente, andar, tipo, error);
      setEstado(null); // Define o estado como null em caso de erro
    }
  };

  const togglePorta = async () => {
    try {
      const response = await axios.post("/api/dispositivos/alterarEstado", {
        dispositivo, ambiente, andar, tipo
      });
      setEstado(response.data.estado);
    } catch (error) {
      console.error("Erro ao alternar estado do " + dispositivo, ambiente, andar, tipo, error);
    }
  };

  useEffect(() => {
    fetchEstado();
    const interval = setInterval(fetchEstado, 2000);
    return () => clearInterval(interval);
  }, []);

  let buttonClass = "btnPorta";
  let abertura = " Carregando";

  // Verifica o estado
  if (estado === null) {
    buttonClass += " btnPorta-indisponivel"; // Adiciona a classe porta-unknown se o estado for desconhecido
    abertura = "Carregando";
  } else {
    buttonClass += estado === "1" ? " btnPorta-aberta" : " btnPorta-fechada";
    abertura = estado === "1" ? " Aberta" : " Fechada";
  }

  const getImageSrc = () => {
    if (estado === null) {
      return "/icones/porta-fechada.png";
    } else if (estado === "1") {
      return "/icones/porta-aberta.png";
    } else {
      return "/icones/porta-fechada.png";
    }
  };

  return (
    <button className="porta" disabled={estado === null}>

      <div className={buttonClass} onClick={togglePorta}>

        <div className="btnPorta-display">

          <Image className="btnPorta-icone"
            src={getImageSrc()}
            width={50}
            height={50}
            alt="Estado da porta"
            property="true"
          />

          {/* <span className="btnPorta-nome">{dispositivo}</span>
          <span className="btnPorta-ambiente">{ambiente}</span> */}

          <span className="btnPorta-nome">{alias}</span>

          <div className="btnDeslizante-porta">
            <span className="btnPorta-estado">{abertura}</span>
            <div className="retangulo"><div className="circulo"></div></div>
          </div>

          <div className="iconeIndisponivel">
            <Image className="btnPorta-icone"
              src="/icones/indisponivel.png"
              width={50}
              height={50}
              alt="Estado da porta"
              property="true"
            />

          </div>
        </div>
      </div>
    </button>
  );
};

export default Porta;
