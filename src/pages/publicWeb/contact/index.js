import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { MessageService } from "services";
import Loading from "components/loading";
import "./styles.css";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      subject: '',
      message: '',
      formErro: '',
      formErroMsg: '',
      loading: false,
    };
  }

  async handleNameChange(e){ this.setState({ name: e.target.value }); }
  async handleEmailChange(e){ this.setState({ email: e.target.value }); }
  async handleSubjectChange(e){ this.setState({ subject: e.target.value }); }
  async handleMessageChange(e){ this.setState({ message: e.target.value }); }

  async handleSendMessage(e) {
    e.preventDefault();
    this.setState({ loading: true });

    const {name, email, subject, message} = this.state;

    await this.validaForm();

    if (this.state.formErroMsg.length > 0) {
      this.setState({ loading: false });
      return;
    }

    MessageService.SendSiteContactMessage({name, email, subject, message}).then((res) => {

        if (res.data.status === false) {
          this.showErrors(res);
        } else {
          alert("Mensagem enviada com sucesso!");
          this.gotoAuth();
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
      formErro: true,
      formErroMsg: await errors.map((x, idx) => <p key={idx + "logon"}>{x}</p>),
    });
  }

  async validaForm() {

    this.setState({ formErro: "none", formErroMsg: [] });
    const {name, email, subject, message} = this.state;

    if (name === "" || email === "" || subject === "" || message === "") {
      this.setState({
        formErro: true,
        formErroMsg: ["Informe todos os campos."],
      });
    }
  }

  gotoAuth() {
    this.props.history.push("/auth");
  }

  render() {
    const {name, email, subject, message} = this.state;

    return (
      <section className="form my-4 mx-5">
        <div className="register-container">
          <div className="content">
            <section>
              <h1>Contato</h1>
              <p>
              Faça contato! Preencha os dados ao lado e envie sua mensagem.
              </p>

              <Link className="back-link" to="/auth">
                <FiArrowLeft size={16} color="#E02041" />
                Home
              </Link>
            </section>

            <form onSubmit={this.handleSendMessage}>
              <input
                placeholder="Nome"
                value={name}
                onChange={(e) => { this.handleNameChange(e) }}
                required={true}
              />

              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => { this.handleEmailChange(e) }}
                required={true}
              />
              
              <input
                type="text"
                placeholder="Assunto"
                value={subject}
                onChange={(e) => { this.handleSubjectChange(e) }}
                required={true}
              />
              <br />

              <textarea 
                type="textarea"
                placeholder="Mensagem"
                value={message}
                onChange={(e) => { this.handleMessageChange(e) }}
                required={true}
              />

              <div className="row">

                  <div className="col-lg-12" style={{ display: this.state.formErro }}>
                    <br />
                    <div
                      className="alert alert-warning alert-dismissible fade show"
                      role="alert"
                    >
                      <strong>Ooops! </strong>
                      {this.state.formErroMsg}
                      <button
                        type="button"
                        onClick={() =>
                          this.setState({
                            formErroMsg: "",
                            formErro: "none",
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

              <button
                disabled={this.state.loading}
                className="button"
                onClick={(e) => this.handleSendMessage(e)}
                type="button"
              >
                <span className="" role="status" aria-hidden="true">
                  {!this.state.loading ? (
                    "Enviar"
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
