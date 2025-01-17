import axios from "axios";
import { BASE_URL } from "../constant";
export const httpRequest = axios.create({
    baseURL:BASE_URL
}) 