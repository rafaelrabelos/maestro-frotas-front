
import React from "react";
import "./css/admin-pet-classes.css";

class PageHeader extends React.Component {
  render() {
    const autoCloseClasses = true;
    return(
      <div className="col col-md-12">
          <div className="jumbotron">
            <h1 className="display-6">Classes/ Familias</h1>
            <p className="lead">
              Gerencie os cadastros de famílias/classes de pets.
            </p>
            <br />
            <hr className="my-4" />
            <p className="lead">
              <button
                className={`btn btn-sm btn-outline-${
                  autoCloseClasses ? "success" : "secondary"
                }`}
                onClick={() => this.toggleAutoClose()}
              >
                <i className="fa fa-check"></i> Auto fechar guias
              </button>{" "}
            </p>
            <small>
              As configurações acima estão sendo utilizadas na paginas, ao
              aterar talvez seja preciso recarregar a pagina para ter efeito.
            </small>
          </div>
        </div>
    );
  }
}

export default PageHeader;