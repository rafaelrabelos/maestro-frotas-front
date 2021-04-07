import React from "react";
import frotaImg from "img/frota.png";
import "./styles.css";

export default function Home() {
  return (
    <>
      <div className="container form-inline">
        <div className="card" style={{ width: "18rem", margin: "1%" }}>
          <img
            alt="topo"
            src={frotaImg}
            className="card-img-top"
            width="30px"
            height="200px"
          />
          <div className="card-body">
            <h5 className="card-title">Bulldog</h5>
            <p className="card-text">
              Cachorro fofo, com nenhum problema de comportamento e muito bem
              criado.
            </p>
            <a href="/hero" className="btn btn-primary">
              Mais Informações
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
