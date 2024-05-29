"use client";

import React, { useState, useEffect } from "react";
import axios from "axios"; //npm install axios
import { Howl } from "howler"; //npm install howler
import Image from "next/image";
import "./GasEfumaca.css";

const GasEfumaca = () => {
  const [valor, setValor] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [sound, setSound] = useState(null);
  const [autoplayPermission, setAutoplayPermission] = useState(false);

  const isEasterEgg = process.env.NEXT_PUBLIC_EASTEREGG === '1';

  useEffect(() => {
    const alertSound = new Howl({
      src: [isEasterEgg ? '/sons/ta pegando fogo bicho.mp3' : '/sons/alerta.mp3'], // Ative no arquivo .env para animar a apresentação do projeto nos stands das faculdades e desative para apresentar em uma ocasião mais séria
      loop: true,
    });
    setSound(alertSound);

    const fetchGasEfumaca = async () => {
      try {
        const response = await axios.get("/api/sensores/gasEfumaca");
        setValor(response.data.valor);

        if (response.data.valor == 1) {
          setShowAlert(true);
          // Tenta tocar o som imediatamente
          if (!alertSound.playing()) {
            alertSound.play().catch((error) => {
              console.error("Erro ao tentar tocar o som automaticamente:", error);
            });
          }
        } else {
          setShowAlert(false);
          if (alertSound.playing()) {
            alertSound.stop();
          }
        }
      } catch (error) {
        console.error("Erro ao buscar Gás e Fumaça", error);
      }
    };

    fetchGasEfumaca();
    const interval = setInterval(fetchGasEfumaca, 1000);

    return () => {
      clearInterval(interval);
      alertSound.unload();
    };
  }, [isEasterEgg]);

  useEffect(() => {
    const handleInteraction = () => {
      if (sound && showAlert && !sound.playing()) {
        try {
          sound.play();
        } catch (error) {
          console.error("Erro ao tentar tocar o som em resposta a uma interação do usuário:", error);
        }
      }
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, [sound, showAlert]);

  // Solicitar permissão do navegador para reproduzir áudio automaticamente quando a página abrir
  useEffect(() => {
    const requestAutoplayPermission = async () => {
      try {
        const audioContext = new AudioContext();
        await audioContext.resume();
        console.log("Permissão concedida para reprodução automática de áudio.");
        setAutoplayPermission(true);
      } catch (error) {
        console.error("Falha ao solicitar permissão para reprodução automática de áudio:", error);
        setAutoplayPermission(false);
      }
    };

    requestAutoplayPermission();

  }, []);

  return (
    <div className="gasEfumaca">
      {showAlert && (
        <div className="alert-popup">
          <Image
            src={isEasterEgg ? "/imagens/ta pegando fogo bicho.gif" : "/imagens/alerta.gif"} // Ative no arquivo .env para animar a apresentação do projeto nos stands das faculdades e desative para apresentar em uma ocasião mais séria
            alt="Alerta"
            className="imgAlertaGasEfumaca"
            width={100}
            height={100}
            loading="eager"
          />
        </div>
      )}
    </div>
  );
};

export default GasEfumaca;