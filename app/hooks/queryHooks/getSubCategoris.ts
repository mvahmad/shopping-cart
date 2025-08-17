import { ENDPOINTS } from "@/app/constant";
import { httpRequest } from "@/app/services/http-request";

interface Props {
    limit?: number;
}
  
export const getSubcategories = async ({ limit }: Props) => {
    const url = `${ENDPOINTS.SUBCATEGORIES}?&limit=${limit}`;
    const response = await httpRequest.get(url);
    return response.data;
};
  
export const getSubcategoriesByCategoryId = async (id: string) => {
    if (id) {
      const url = `${ENDPOINTS.SUBCATEGORIES}?category=${id}`;
      const response = await httpRequest.get(url);
      return response.data;
    }
};
  