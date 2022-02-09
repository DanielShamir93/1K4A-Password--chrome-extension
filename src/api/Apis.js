import axios from "axios";

let myUrl = "https://one-key-for-all-paswords.herokuapp.com/";

let myApi = axios.create({
  baseURL: myUrl,
});

export default myApi;
