import api from "./api";
import { secureStorage } from 'websecure-local-storage'

export async function Obtem() {
  let response = { data: { status: false, erros: [] } };

  const token = secureStorage().getItem("token");

  try {
    const res = await (await api()).get("/user/todos", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (err) {
    console.log(err.response);
    response.data.erros = err.response.data.erros;
    return response;
  }
}

export async function GetSelf() {
  let response = { data: { status: false, erros: [] } };

  const token = secureStorage().getItem("token");

  try {
    const res = await (await api()).get(`/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (err) {
    console.log(err.response);
    response.data.erros = err.response.data.erros;
    return response;
  }
}

export async function Update({ nome, sobrenome, email }) {
  let response = { data: { status: false, erros: [] } };
  const token = secureStorage().getItem("token");

  try {
    const res = await (await api()).put(
      "/user",
      { nome, sobrenome, email },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return res;
  } catch (err) {
    console.log(err.response);
    response.data.erros = err.response.data.erros;
    return response;
  }
}

export async function Delete(userId) {
  let response = { data: { status: false, erros: [] } };
  const token = secureStorage().getItem("token");

  try {
    const res = await (await api()).delete (
      `/user/${userId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return res;
  } catch (err) {
    console.log(err.response);
    response.data.erros = err.response.data.erros;
    return response;
  }
}

export async function Create({ nome, email, senha }) {
  const user = process.env.REACT_APP_SYS_BACK_USER;
  const pass = process.env.REACT_APP_SYS_BACK_PW;
  let response = { data: { status: false, erros: [] } };

  if (!user || !pass) {
    response.data.erros = ["Sistema não pode acessar o ambiente externo."];
    return response;
  }

  try {
    const sysLogin = await (await api()).post("/login", { email: user, senha: pass });

    if (sysLogin.data.status !== true) {
      response.data.erros = ["Sistema não pode se validar corretamente."];
      return response;
    }

    const token = sysLogin.data.data.token;
    const res = await (await api()).post(
      "/user",
      { nome, email, senha },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return res;
  } catch (err) {
    console.log(err.response);
    response.data.erros = err.response.data.erros;
    return response;
  }
}
