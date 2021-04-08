
import React from "react";
import "./css/admin-pet-classes.css";

class PageHeader extends React.Component {
  render() {
    return(
      <div className="col col-md-12">
          <div className="jumbotron">
            <h1 className="display-6">Gerencie</h1>
            <p className="lead">
              Gerencie os cadastros.
            </p>
            <p className="lead">
            </p>
            <small>
              Gerenciamento do administrador
            </small>
          </div>
        </div>
    );
  }
}

export default PageHeader;