import api from "./api";
import {IncludeSysCredentialsToRequest} from "./authservice";

export async function SendSiteContactMessage({ name, email, subject, message }) {

  let response = { data: { status: false, erros: [] } };

  try {
    const httpClient = await api(IncludeSysCredentialsToRequest);

    if(httpClient.data) return httpClient;

    const res = await httpClient.post(
      "/message/contactpage",
      { name, email, subject, message }
      );

    return res;
  } catch (err) {
    console.log(err)
    console.log(err.response);
    response.data.erros = err.response.data.erros;
    return response;
  }
}
