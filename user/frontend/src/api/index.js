import axios from "axios";
import domain from "./domain";

// const instance = axios.create({
//   baseURL: "http://localhost:3001/",
//   timeout: 90000
// });
const instance = axios.create({
  baseURL: domain.base,
  timeout: 90000
});
export default instance;