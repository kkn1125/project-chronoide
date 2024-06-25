import axios from "axios";
import { API_BASEPATH, API_HOST, API_PORT } from "../common/variables";

export const chronoRequest = axios.create({
  baseURL: `http://${API_HOST}:${API_PORT}/${API_BASEPATH}`,
});
