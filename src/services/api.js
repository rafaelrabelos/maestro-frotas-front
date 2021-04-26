import axios from "axios";
const publicIp = require('public-ip')

const req = async (_execFN = (inst) => inst) => {
   axios.defaults.headers.common['client_ip'] = await publicIp.v4()
   const createdInst = axios.create({ baseURL: process.env.REACT_APP_API_URL, });
   
  return _execFN(createdInst);;
}

export default req;
