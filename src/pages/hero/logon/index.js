import React from "react";
import { AuthService } from "services";
import frotaImage from "img/frota.png";
import "./styles.css";

export default class Logon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cpf: "",
      senha: "",
      loginErro: "none",
      loginErroMsg: "",
    };
  }

  componentDidMount() {
    if (AuthService.IsValideSession()) {
      this.gotoHome();
    }
  }

  handleLogin(e) {
    e.preventDefault();

    AuthService.Login({ cpf: this.state.cpf, senha: this.state.senha })
      .then((res) => {
        if (res.data.status === false) {
          this.showErrors(res);
        } else {
          alert("Login Efetuado com sucesso!");
          this.gotoHome();
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          this.showErrors(err.response);
        }
        console.log(err);
        console.log(err.response);
      });
  }

  showErrors(erros) {
    let errors = [];

    if (erros.data && Array.isArray(erros.data.erros)) {
      errors = erros.data.erros;
    } else {
      errors = [`${erros.status} ${erros.statusText} `];
    }

    this.setState({
      loginErro: true,
      loginErroMsg: errors.map((x, idx) => <p key={idx + "logon"}>{x}</p>),
    });
  }

  gotoHome() {
    this.props.history.push("/hero");
  }

  render() {
    return (
      <section className="form my-4 mx-5">
        <div className="container main-container">
          <div className="row no-gutters">
            <div className="col-lg-6 col-md-6">
              <br />
              <div className="col-lg-12 col-md-10 img">
                <img alt="dog-banner" src={frotaImage} className="img-fluid" />
              </div>
              
            </div>
            <div className="col-lg-6 col-md-6 px-5 pt-5">
              <h1 className="font-weight-bold py-3">
                {/* <img src={logoImg} className="img-fluid" alt="" /> */}
                Maestro Frotas
              </h1>
              <br />
              <h5>Acessar o sistema</h5>
              <form onSubmit={this.handleLogin}>
                <div className="form-row">
                  <div className="col-lg-10">
                    <input
                      type="cpf"
                      placeholder="CPF"
                      value={this.cpf}
                      onChange={(e) => {
                        this.setState({ cpf: e.target.value });
                      }}
                      className="form-control my-3 p-4"
                      required={true}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-lg-10">
                    <input
                      type="password"
                      placeholder="Senha"
                      value={this.senha}
                      onChange={(e) => {
                        this.setState({ senha: e.target.value });
                      }}
                      className="form-control p-4"
                      required={true}
                    />
                  </div>
                </div>
                <div
                  className="form-row"
                  style={{ display: this.state.loginErro }}
                >
                  <div className="col-lg-10">
                    <br />
                    <div
                      className="alert alert-warning alert-dismissible fade show"
                      role="alert"
                    >
                      <strong>Ooops!</strong>
                      {this.state.loginErroMsg}{" "}
                      <a href="/auth/recuperar-senha">Recuperar senha</a>
                      <button
                        type="button"
                        onClick={() =>
                          this.setState({ loginErroMsg: "", loginErro: "none" })
                        }
                        className="close"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="col-lg-10">
                    <button
                      onClick={(e) => this.handleLogin(e)}
                      type="submit"
                      className="btn1 mt-3 mb-1"
                    >
                      Acessar
                    </button>
                  </div>
                </div>
                <p>
                 Ainda não tem registro?
                  <a href="/auth/cadastrar"> Cadastre-se!</a>
                </p>
              </form>
              <div className="col-lg-12 col-md-8">
                <p className="centertext descriptiontext">
                  <br />
                  <br />
                  <br />
                  &#128073; Diariamente milhares de veículos são utilizados em toda a cidade. 
                  A gestão destas frotas é primordial para que uma empresa tenha controle e redução de custos.
                  <br />
                </p>

                <ul style={{ margin: "30px", fontsize: "large" }}>
                  <li>
                    Já são mais de <b>10.000</b> empresas{" "}
                  </li>
                  <li>
                    Não menos que <b>380.000</b> veíclos
                  </li>
                  <li>
                    Entre nossos cliente, são mais de <b>88%</b> satisfeitos
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
