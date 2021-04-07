import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { cpf } from 'cpf-cnpj-validator'; 
import { ProfileService, AuthService } from "services";
import Loading from "components/loading";
import "./styles.css";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      cpf: "",
      email: "",
      senha: "",
      senhaRepetida: "",
      cadastrarErro: "none",
      cadastrarErroMsg: "",
      loading: false,
    };
  }

  async handleRegister(e) {
    e.preventDefault();
    this.setState({ loading: true });

    await this.validaForm();

    if (this.state.cadastrarErroMsg.length > 0) {
      this.setState({ loading: false });
      return;
    }

    ProfileService.Create({
      nome: this.state.nome,
      cpf: this.state.cpf,
      email: this.state.email,
      senha: this.state.senha,
    }).then((res) => {
        if (res.data.status === false) {
          this.showErrors(res);
        } else {
          alert("Cadastro Efetuado com sucesso!");
          AuthService.Login({
            email: this.state.email,
            senha: this.state.senha,
          }).then(() => this.gotoAuth());
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          this.showErrors(err.response);
        }
        console.log(err);
        console.log(err.response);
      });
    this.setState({ loading: false });
  }

  async showErrors(erros) {
    let errors = [];

    if (erros.data && Array.isArray(erros.data.erros)) {
      errors = erros.data.erros;
    } else {
      errors = [`${erros.status} ${erros.statusText} `];
    }

    this.setState({
      cadastrarErro: true,
      cadastrarErroMsg: await errors.map((x, idx) => <p key={idx + "logon"}>{x}</p>),
    });
  }

  async validaCpf() {

    this.setState({ cadastrarErro: "none", cadastrarErroMsg: [] });
    
    if (this.state.cpf.length > 10 && !cpf.isValid(this.state.cpf)) {
      this.setState({
        cadastrarErro: true,
        cadastrarErroMsg: ["Cpf inválido"],
      });
      return false;
    }
    if(this.state.cpf.length < 11){
      return false
    }

    return true;
  }

  async validaSenhas() {

    this.setState({ cadastrarErro: "none", cadastrarErroMsg: [] });

    if (this.state.senha !== this.state.senhaRepetida || this.state.senha === "") {
      this.setState({
        cadastrarErro: true,
        cadastrarErroMsg: ["As senha não são iguais ou são inválidas"],
      });
      return false;
    }
    return true;
  }

  async validaForm() {

    this.setState({ cadastrarErro: "none", cadastrarErroMsg: [] });

    await this.validaSenhas() && await this.validaCpf();

    if (this.state.cpf.length < 11){
      this.setState({
        cadastrarErro: true,
        cadastrarErroMsg: ["CPF incompleto."],
      });
    }
    else if (
      this.state.nome === "" ||
      this.state.cpf === "" ||
      this.state.email === "" ||
      this.state.senha === ""
    ) {
      this.setState({
        cadastrarErro: true,
        cadastrarErroMsg: ["Informe todos os campos."],
      });
    }
  }

  gotoAuth() {
    this.props.history.push("/auth");
  }

  render() {
    return (
      <section className="form my-4 mx-5">
        <div className="register-container">
          <div className="content">
            <section>
              <h1>Cadastro</h1>
              <p>
              Faça seu cadastro para ter acesso ao sistema.
              </p>

              <Link className="back-link" to="/auth">
                <FiArrowLeft size={16} color="#E02041" />
                Já tenho cadastro
              </Link>
            </section>

            <form onSubmit={this.handleRegister}>
              <input
                placeholder="Nome"
                value={this.nome}
                onChange={(e) => {
                  this.setState({ nome: e.target.value });
                }}
                required={true}
              />
              
              <input
                type="cpf"
                placeholder="CPF"
                value={this.cpf}
                onChange={(e) => {
                  this.setState({ cpf: cpf.format(e.target.value)},
                  async () =>{
                    await this.validaCpf()
                  });
                }}
                required={true}
              />

              <input
                type="email"
                placeholder="E-mail"
                value={this.email}
                onChange={(e) => {
                  this.setState({ email: e.target.value });
                }}
                required={true}
              />
              <br />

              <input
                type="password"
                placeholder="Senha"
                value={this.senha}
                onChange={(e) => {
                  this.setState({ senha: e.target.value });
                }}
                required={true}
              />
              <input
                type="password"
                placeholder="Repetir Senha"
                value={this.state.senhaRepetida}
                onChange={(e) =>
                  this.setState({ senhaRepetida: e.target.value }, async () =>
                    await this.validaSenhas()
                  )
                }
                required={true}
              />
              <div className="row">
                <div
                  className="form-row"
                  style={{ display: this.state.cadastrarErro }}
                >
                  <div className="col-lg-12">
                    <br />
                    <div
                      className="alert alert-warning alert-dismissible fade show"
                      role="alert"
                    >
                      <strong>Ooops! </strong>
                      {this.state.cadastrarErroMsg}
                      <button
                        type="button"
                        onClick={() =>
                          this.setState({
                            cadastrarErroMsg: "",
                            cadastrarErro: "none",
                          })
                        }
                        className="close"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <button
                disabled={this.state.loading}
                className="button"
                onClick={(e) => this.handleRegister(e)}
                type="button"
              >
                <span className="" role="status" aria-hidden="true">
                  {!this.state.loading ? (
                    "Cadastrar"
                  ) : (
                    <Loading loading={this.state.loading} />
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }
}
