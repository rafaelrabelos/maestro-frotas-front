import axios from "axios";
const publicIp = require('public-ip')

const req = async () => {
   axios.defaults.headers.common['client_ip'] = await publicIp.v4()

  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
}

export default req;
