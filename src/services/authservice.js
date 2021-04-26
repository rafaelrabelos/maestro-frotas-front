import api from "./api";
import jwt_decode from "jwt-decode";

export async function SendRecoveryCode({ cpf }) {
  let response = { data: { status: false, erros: [] } };
  
  try {
    const res = await(await api()).post("/auth/recovery/send-info", { cpf });
    return res;
  } catch (err) {
    console.log(err.response || "");
    response.data.erros = err.response.data.erros;
    return response;
  }
}

export async function ValidateRecoveryCode({ cpf, code }) {
  let response = { data: { status: false, erros: [] } };
  
  try {
    const res = await(await api()).post("/auth/recovery/validate-code", { cpf, code });
    return res;
  } catch (err) {
    console.log(err.response || "");
    response.data.erros = err.response.data.erros;
    return response;
  }
}

export async function SetRecoveryPassword({ cpf, code, pass }) {
  let response = { data: { status: false, erros: [] } };
  
  try {
    const res = await(await api()).post("/auth/recovery/set-password", { cpf, code, pass });
    return res;
  } catch (err) {
    console.log(err.response || "");
    response.data.erros = err.response.data.erros;
    return response;
  }
}

export async function Login({ cpf, senha }) {
  let response = { data: { status: false, erros: [] } };

  try {
    const res = await(await api()).post("/auth/login", { cpf, senha });

    if (res.data.status !== false) {
      sessionStorage.setItem("token", res.data.data.token);
      IsValideSession();
    }

  return res;
  } catch (err) {
    console.log(err)
    console.log(err.response);
    response.data.erros = err.response.data.erros;
    return response;
  }
}

export async function IncludeSysCredentialsToRequest(httpClient) {
  const user = process.env.REACT_APP_SYS_BACK_USER;
  const pass = process.env.REACT_APP_SYS_BACK_PW;
  let response = { data: { status: false, erros: [] } };

  if (!user || !pass) {
    response.data.erros = ["Sistema não pode acessar o ambiente externo."];
    return response;
  }

  try {
    const sysLogin = await httpClient.post("/auth/login", { cpf: user, senha: pass });

    if (sysLogin.data.status !== true) {
      response.data.erros = ["Sistema não pode se validar corretamente."];
      return response;
    }

    const sysData = sysLogin.data.data;
    httpClient.defaults.headers.common['Authorization'] = `Bearer ${sysData.token}`;

    return httpClient;
  } catch (err) {
    console.log(err.response);
    response.data.erros = err.response.data.erros;
    return response;
  }
}

export async function Logout() {
  SessionFinish();
}

export function GetSessionData({ itemNane }) {
  localStorage.getItem(itemNane);
}

function SessionInit(data) {
  sessionStorage.setItem("nome", data.user.nome);
  sessionStorage.setItem("email", data.user.email);
  sessionStorage.setItem("usertype", data.user.type);
  sessionStorage.setItem("token", data.token);
}

function SessionFinish() {
  sessionStorage.clear();
}

export function IsValideSession() {
  var token = sessionStorage.getItem("token");

  if (sessionStorage.getItem("token") !== null) {
    var decoded = jwt_decode(token);

    if (!decoded) {
      return false;
    }

    SessionInit({
      user: {
        nome: decoded.user.nome,
        email: decoded.user.email,
        type: decoded.type,
      },
      token: token,
    });
    return true;
  }

  return false;
}
