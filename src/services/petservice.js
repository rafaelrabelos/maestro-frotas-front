import api from "./api";

export async function ObtemPetClasses() {
  let response = { data: { status: false, erros: [] } };

  const token = sessionStorage.getItem("token");

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
