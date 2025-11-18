import { ENDPOINTS } from "@/app/constant";
import { httpServer as httpRequest } from "@/utils/http-server";
import { ParamsType } from "./products";
  
export const getSubcategories = async (params?: ParamsType) => {
    const url = ENDPOINTS.SUBCATEGORIES;
    const response = await httpRequest.get(url, { params });
    return response.data;
};
  
export const getSubcategoriesByCategoryId = async (id: string) => {
    if (id) {
      const url = `${ENDPOINTS.SUBCATEGORIES}?category=${id}`;
      const response = await httpRequest.get(url);
      return response.data;
    }
};
export const getSubcategoriesBySubCategoryId = async (id: string) => {
    if (id) {
      const url = `${ENDPOINTS.SUBCATEGORIES}?subcategory=${id}`;
      const response = await httpRequest.get(url);
      return response.data;
    }
};
  