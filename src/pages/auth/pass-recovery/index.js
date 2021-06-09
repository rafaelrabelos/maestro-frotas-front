import React from "react";
import Loading from "components/loading";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { cpf } from "cpf-cnpj-validator";
import { AuthService } from "services";
import { Alert } from "bootstrap";
import "./styles.css";

export default class PasswordRecovery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cpf: "",
      recoveryCode: "",
      codeVality: "",
      sent_email:"",
      senha: "",
      senhaRepetida: "",
      step: 1,
      statusMsg: "none",
      enableBtn: false,
      recoverPassErro: "none",
      recoverPassErroMsg: "",
      loading: false,
    };
  }
  
  componentDidMount() {
    this.setState({
      statusMsg: `Informe seu CPF para receber o código de recuperação em seu e-mail.
      Caso não tenha acesso ao seu email, entre em contado com o administrados do sistema.`,
    });
  }

  async handleRecovery(e) {
    e.preventDefault();

    const { step } = this.state;
    this.setState({ loading: true });

    if (step === 1 && (await this.enviaRecoveryCode())) {

      this.setState({
        step: step + 1,
        enableBtn: false,
        statusMsg: `Informe o Código enviado no email para seguir com a redefinição da senha`,
      });
    } else if (step === 2 && await this.validaRecoveryCode()) {
      this.setState({
        step: step + 1,
        enableBtn: false,
        statusMsg: `Informe as senhas novas para finalizar o processo de recuperação.`,
      });
    } else if (step === 3 && (await this.validaForm()) && (await this.updatePassword())) {

      alert("Senha alterada com sucesso");
      this.setState({
        step: 1,
        cpf: "",
        senha: "",
        senhaRepetida: "",
        recoveryCode: "",
        statusMsg: "",
      }, () => this.gotoAuth());
    } 

    if (this.state.recoverPassErroMsg.length > 0) {
      this.setState({ loading: false });
      return;
    }
    
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
      recoverPassErro: true,
      recoverPassErroMsg: await errors.map((x, idx) => (
        <p key={idx + "recover"}>{x}</p>
      )),
    });
  }

  async validaCpf() {
    const userCpf = this.state.cpf;
    this.setState({
      recoverPassErro: "none",
      recoverPassErroMsg: [],
      enableBtn: false,
    });

    if (userCpf.length > 10 && !cpf.isValid(userCpf)) {
      this.setState({
        recoverPassErro: true,
        recoverPassErroMsg: ["Cpf inválido"],
      });
      return false;
    }
    if (userCpf.length < 11) {
      return false;
    }

    this.setState({ enableBtn: true });

    return true;
  }

  async enviaRecoveryCode() {
    this.setState({ recoverPassErro: "none", recoverPassErroMsg: [] });

    const isValidCpf = await this.validaCpf();
    const { cpf } = this.state;

    if (!isValidCpf) {
      this.setState({
        recoverPassErro: true,
        recoverPassErroMsg: ["CPF inválido para a solicitação."],
      });
      return false;
    }

    var res = await AuthService.SendRecoveryCode({ cpf });

    if (!res.data.status && Array.isArray(res.data.erros)) {
      this.showErrors(res);
      return false;
    }

    const { vality, sent_email } = res.data;

    this.setState({
      enableBtn: true,
      codeVality: vality,
      sent_email: sent_email,
    });
    return isValidCpf;
  }

  async validaRecoveryCodeFormat() {
    const { recoveryCode } = this.state;
    const NUMERIC_REGEXP = /^[0-9]{3,6}$/;
    const isValidCode = NUMERIC_REGEXP.test(recoveryCode);

    this.setState({ enableBtn: isValidCode });
  }

  async validaRecoveryCode() {
    this.setState({ recoverPassErro: "none", recoverPassErroMsg: [] });

    const { recoveryCode, cpf } = this.state;

    var res = await AuthService.ValidateRecoveryCode({ cpf, code: recoveryCode });

    if (!res.data.status && Array.isArray(res.data.erros)) {
      this.showErrors(res);
      return false;
    }

    if (!recoveryCode || recoveryCode === "" || !this.validaRecoveryCodeFormat()) {
      this.setState({
        recoverPassErro: true,
        recoverPassErroMsg: ["Codigo inválido"],
      });
      return false;
    }

    return true;
  }

  async updatePassword() {

    this.setState({ recoverPassErro: "none", recoverPassErroMsg: [] });

    const { recoveryCode, cpf, senha } = this.state;

    var res = await AuthService.SetRecoveryPassword({ cpf, code: recoveryCode, pass: senha });

    if (!res.data.status) {
      this.showErrors(res);
      return false;
    }

    return true;
  }

  async validaSenhas() {
    this.setState({ recoverPassErro: "none", recoverPassErroMsg: [] });
    var isValidPass = true;
    if (
      this.state.senha !== this.state.senhaRepetida ||
      this.state.senha === ""
    ) {
      this.setState({
        recoverPassErro: true,
        recoverPassErroMsg: ["As senha não são iguais ou são inválidas"],
      });
      isValidPass = false;
    }

    this.setState({ enableBtn: isValidPass });
    return isValidPass;
  }

  async validaForm() {
    this.setState({ recoverPassErro: "none", recoverPassErroMsg: [] });

    if (this.state.recoverPassErro === true) {
      Alert("Há erros pendentes no preenchimento.");
    }
    if (
      this.state.cpf === "" ||
      this.state.recoveryCode === "" ||
      this.state.senha === ""
    ) {
      this.setState({
        recoverPassErro: true,
        recoverPassErroMsg: ["Ha campos sem dados. Verifique o preenchimento"],
      });
    } else if (this.state.cpf.length < 11) {
      this.setState({
        recoverPassErro: true,
        recoverPassErroMsg: ["CPF incompleto."],
      });
    } else if (!(await this.validaCpf())) {
      this.setState({
        recoverPassErro: true,
        recoverPassErroMsg: ["CPF não válido"],
      });
    } else if (!(await this.validaSenhas())) {
      this.setState({
        recoverPassErro: true,
        recoverPassErroMsg: ["Senha não válida"],
      });
    } else if (!(await this.validaRecoveryCode())) {
      this.setState({
        recoverPassErro: true,
        recoverPassErroMsg: ["Código de recuperação não válido"],
      });
    } else {
      return true;
    }

    return false;
  }

  gotoAuth() {
    this.props.history.push("/auth");
  }

  render() {
    const { 
      step, 
      loading, 
      enableBtn, 
      statusMsg, 
      codeVality, 
      sent_email } = this.state;

    const stepBtnMsg = {
      1: "Enviar dados de recuperação",
      2: "Validar codigo",
      3: "Atualizar senha",
    };
    return (
      <section className="form my-4 mx-5">
        <div className="register-container">
          <div className="content">
          <div className="col col-md-4">
                <section>
                  <h2>Recuperação de senha</h2>
                  <p>
                    Informe os dados ao lado para realizar a recuperação de senha
                  </p>
                </section>
              </div>
              <div className="col col-md-6">
            <form onSubmit={(e) => this.handleRecovery(e)}>
              <div className="input-wrapper">
                <input
                  type="cpf"
                  placeholder="CPF"
                  value={this.state.cpf}
                  onChange={(e) => {
                    this.setState(
                      { cpf: cpf.format(e.target.value) },
                      async () => {
                        await this.validaCpf();
                      }
                    );
                  }}
                  required={true}
                  disabled={step > 1}
                />
                {step > 1 && (
                  <span className="fa fa-check-circle fa-2x validspanicon"></span>
                )}
              </div>
              <div className="input-wrapper">
                <input
                  type="code"
                  placeholder="Código de validação"
                  value={this.state.recoveryCode.replace(/\D/g, "")}
                  onChange={(e) => {
                    this.setState(
                      { recoveryCode: e.target.value.replace(/\D/g, "") },
                      async () => await this.validaRecoveryCodeFormat()
                    );
                  }}
                  required={step >= 2}
                  disabled={step !== 2}
                />
                {step > 2 && (
                  <span className="fa fa-check-circle fa-2x validspanicon"></span>
                )}
                {codeVality && sent_email && step === 2 && <div
                  className="alert alert-success"
                  style={{ marginTop: "10px" }}
                >
                  <small>{`Dados enviado para ${sent_email}, com validade até ${codeVality}`}</small>
                </div>}
              </div>
              <div className="input-wrapper">
                <input
                  type="password"
                  placeholder="Senha"
                  value={this.state.senha}
                  onChange={(e) => {
                    this.setState({ senha: e.target.value });
                  }}
                  required={step >= 3}
                  disabled={step !== 3}
                />
              </div>
              <div className="input-wrapper">
              <input
                type="password"
                placeholder="Repetir Senha"
                value={this.state.senhaRepetida}
                onChange={(e) =>
                  this.setState(
                    { senhaRepetida: e.target.value },
                    async () => await this.validaSenhas()
                  )
                }
                required={step >= 3}
                disabled={step !== 3}
              />
            </div>
              <div
                className="row"
                style={{ display: this.state.recoverPassErro }}
              >
                <div className="col-lg-12 ">
                  <br />
                  <div
                    className="alert alert-warning alert-dismissible fade show"
                    role="alert"
                  >
                    <strong>Ooops! </strong>
                    {this.state.recoverPassErroMsg}
                    <button
                      type="button"
                      onClick={() =>
                        this.setState({
                          recoverPassErroMsg: "",
                          recoverPassErro: "none",
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
                className="btn btn1 mt-3 mb-1"
                disabled={loading || !enableBtn}
              >
                {!loading ? stepBtnMsg[step] : <Loading loading={loading} />}
              </button>
              <div className="center" style={{ textAlign: "center" }}>
                <small>{statusMsg}</small>
              </div>
              <Link className="back-link" to="/auth">
                <FiArrowLeft size={16} color="#E02041" />
                Fazer login
              </Link>
            </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
