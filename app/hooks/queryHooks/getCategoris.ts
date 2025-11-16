import { ENDPOINTS } from "@/app/constant";
import { httpServer as httpRequest } from "@/utils/http-server";
export const getCategories = async () => {
    const url = ENDPOINTS.CATEGORIES;
    const response = await httpRequest.get(url);
    return response.data;
  };