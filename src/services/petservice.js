import api from "./api";
import { secureStorage } from 'websecure-local-storage'

export async function ObtemPetClasses() {
  let response = { data: { status: false, erros: [] } };

  const token = secureStorage().getItem("token");

  try {
    const res = await (await api()).get("/pet-classe", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (err) {
    console.log(err.response);
    response.data.erros = err.response.data.erros;
    return response;
  }
}
