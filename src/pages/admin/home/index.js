import React from "react";
import {LineChart,BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';
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
    <div className="card" style={{ margin: "1%" }}>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <LineChart width={400} height={250} data={data}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip />
              <Legend />
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

const cardChartFluxos = (title, desc) =>{
  const data = [
    {name: 'Jan', entrada: 32890, saida: 12600, amt: 2400},
    {name: 'Fev', entrada: 37590, saida: 13300, amt: 2400},
    {name: 'Mar', entrada: 29900, saida: 12500, amt: 2400},
    {name: 'Abr', entrada: 33570, saida: 11489, amt: 2400},
    {name: 'Mai', entrada: 0, saida: 0, amt: 2400}
  ];
  return(
    <div className="card" style={{  margin: "1%" }}>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>

            <BarChart width={400} height={250} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5,}}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="entrada" fill="#8884d8" />
              <Bar dataKey="saida" fill="#82ca9d" />
            </BarChart>

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
        <div className="row">
        <div className="col col-md-6">
        {
          cardChartAdesaoVsLocacao("Adesão X Locação",
          "Descreve o numero de clientes novos e o reflexo nas locações de espaço para a veículos. referencia mensal")
          }
        </div>
        <div className="col col-md-6">
        {
          cardChartFluxos("Entrada X Saída",
          "Descreve o numero os valores de entrada e saída com base nas transações realizadas pelo sistema ou lançadas manualmente.")
          }
        </div>
      </div>
      </div>
    </>
  );
}
