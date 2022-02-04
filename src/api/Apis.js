import axios from "axios";

const PORT = 8080;

let myUrl = `http://localhost:${PORT}/`;

const myApi = axios.create({
  baseURL: myUrl,
});

export default myApi;
