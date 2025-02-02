import { ENDPOINTS } from "@/app/constant";
import { httpRequest } from "@/app/services/http-request";
export const getCategories = async () => {
    const url = ENDPOINTS.CATEGORIES;
    const response = await httpRequest.get(url);
    return response.data;
  };