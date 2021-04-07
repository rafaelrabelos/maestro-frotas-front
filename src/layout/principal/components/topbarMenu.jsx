import React from "react";
import { withRouter } from "react-router";
import "layout/principal/styles/topo.css";

class TopBarMenu extends React.Component {
  render() {
    return (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href="/user">
            Home <span className="sr-only">(current)</span>
          </a>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="/#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Cadastrar
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a className="dropdown-item" href="/user">
              Cadastrar Caso
            </a>
            <a className="dropdown-item" href="/user/cadastrar">
              Cadastrar Pets
            </a>
            <a className="dropdown-item" href="/user">
              Cadastrar Usuário
            </a>
          </div>
        </li>
      </ul>
    );
  }
}

export default withRouter(TopBarMenu);
