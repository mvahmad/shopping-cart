import axios from "axios";
import { BASE_URL } from "@/app/constant";

export const httpServer = axios.create({
  baseURL: BASE_URL,
});
