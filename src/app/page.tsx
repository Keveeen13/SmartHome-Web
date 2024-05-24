import React from "react";
import Image from "next/image";
import Luz from "../components/luz/Luz";
import Temperatura from "../components/temperatura/Temperatura";
import Umidade from "../components/umidade/Umidade";

const Home = () => {
  return (
    <div className="container">
      
      {/* <Image className="logo-site"
        src="/logo/SmartHome - Logo.png"
        alt="Logo SmartHome"
        width={250}
        height={250}
        priority={true}
      /> */}

      <div className="section-sensores">
        <Temperatura />
        <Umidade />
      </div>

      <div className="section-ambientes">

        <div>
          <h2 className="titulo-ambiente">Térreo</h2>
          <div className="section-terreo">
            <Luz dispositivo={"luz-cantina"} alias={"Cantina"} />
            <Luz dispositivo={"luz-andar00-sala01"} alias={"Sala 1"} />
            <Luz dispositivo={"luz-andar00-sala02"} alias={"Sala 2"} />
            <Luz dispositivo={"luz-banheiro-masculino"} alias={"Banheiro feminino"} />
            <Luz dispositivo={"luz-banheiro-feminino"} alias={"Banheiro masculino"} />
            <Luz dispositivo={"luz-hall"} alias={"Hall"} />
          </div>
        </div>



        <div>
          <h2 className="titulo-ambiente">1ª andar</h2>
          <div className="section-1andar">
            <Luz dispositivo={"luz-apartamento"} alias={"Apartamento"} />
            <Luz dispositivo={"luz-andar01-sala01"} alias={"Sala 1"} />
            <Luz dispositivo={"luz-area-circulacao"} alias={"Área de Circulacao"} />
            <Luz dispositivo={"luz-cozinha"} alias={"Cozinha"} />
            <Luz dispositivo={"luz-area-servico"} alias={"Área de Serviço"} />
            <Luz dispositivo={"luz-suite"} alias={"Suíte"} />
            <Luz dispositivo={"luz-banheiro-suite"} alias={"Banheiro da Suíte"} />
            <Luz dispositivo={"luz-banheiro-social"} alias={"Banheiro Social"} />
          </div>
        </div>



        <div>
          <h2 className="titulo-ambiente">Terraço</h2>
          <div className="section-terraco">
            <Luz dispositivo={"luz-estufa"} alias={"Estufa"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
