import React from "react";
import {LineChart, XAxis, YAxis, CartesianGrid, Line} from 'recharts';
import "./styles.css";

const cardChartAdesaoVsLocacao = (title, desc) =>{
  const data = [
    {name: 'Jan', cadastro: 600, locacao: 1200, amt: 2400},
    {name: 'Fev', cadastro: 500, locacao: 1400, amt: 2400},
    {name: 'Mar', cadastro: 400, locacao: 2000, amt: 2400},
    {name: 'Abr', cadastro: 510, locacao: 2300, amt: 2400},
    {name: 'Mai', cadastro: 660, locacao: 2600, amt: 2400}
  ];
  return(
    <div className="card" style={{ width: "33%", margin: "1%" }}>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <LineChart width={300} height={200} data={data}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
              <Line type="monotone" dataKey="cadastro" stroke="#8884d8" />
              <Line type="monotone" dataKey="locacao" stroke="#82ca9d" />
            </LineChart>
            <p className="card-text"><small>{desc}</small></p>
            <div className="row">
            <div className="col col-md-2"><a href="/user" className="btn btn-sm btn-primary">Mais</a></div>
            <div className="col col-md-2"><a href="/user" className="btn btn-sm btn-primary">Export</a></div>
            </div>
          </div>
        </div>
  );
}

export default function AdminDashboard() {
  return (
    <>
      <div className="container">
      {cardChartAdesaoVsLocacao("Adesão X Locação","Descreve o numero de clientes novos e o reflexo nas locações de espaço para a veículos.")}
      </div>
    </>
  );
}
