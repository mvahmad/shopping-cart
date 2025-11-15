import { ENDPOINTS } from "@/app/constant";
import { httpRequest } from "@/app/services/http-request";
import { AddProductschema ,EditProduct } from "@/app/admin/components/schema";

interface ParamsType {
  limit?: string;
  page?: number;
  sort?: string | null;
  category?: string;
  subcategory?: string;
}

export const PostProduct =async (data:AddProductschema) => {
    const url = ENDPOINTS.PRODUCTS;
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("subcategory", data.subcategory);
    formData.append("price", data.price.toString());
    formData.append("quantity", data.quantity.toString());
    formData.append("discount", data.discount.toString());
    formData.append("brand", data.brand);
    formData.append("description", data.description);
    if (data.thumbnail) {
      formData.append("thumbnail", data.thumbnail);
    }
    if (data.images && data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append("images", data.images[i]);
      }
    }
    const response = await httpRequest.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
}
export const DeleteProduct = async(id:string)=>{
  const url = `${ENDPOINTS.PRODUCTS}/${id}`
  const response = await httpRequest.delete(url)
  return response.data
}

export const getProducts =async (searchParams ?:ParamsType )=>{
  const url = ENDPOINTS.PRODUCTS
  const response = await httpRequest.get(url ,{params:searchParams})
  return response.data
}
export const getProductsById = async (id: string | string[]) => {
  const url = `${ENDPOINTS.PRODUCTS}/${id}`;
  const response = await httpRequest.get(url);
  return response.data;
};

export const getProductsBySubCategory = async(subcategoryId:string)=>{
  const url = `${ENDPOINTS.PRODUCTS}?subcategory=${subcategoryId}`
   const response = await httpRequest.get(url);
  return response.data;

}
export const getProductsByCategory = async(categoryId:string) =>{
  const url = `${ENDPOINTS.PRODUCTS}?category=${categoryId}`
  const response = await httpRequest.get(url)
  return response.data
}

export const patchProducts = async ({
  data,
  id,
}: {
  data: EditProduct;
  id: string;
}) => {
  const url = `${ENDPOINTS.PRODUCTS}/${id}`;
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("category", data.category);
  formData.append("subcategory", data.subcategory);
  formData.append("price", data.price.toString());
  formData.append("quantity", data.quantity.toString());
  formData.append("discount", data.discount.toString());
  formData.append("brand", data.brand);
  formData.append("description", data.description);
  if (data.thumbnail.length !== 0) {
    formData.append("thumbnail", data.thumbnail[0]);
  }
  if (data.images && data.images.length > 0) {
    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
    }
  }

  const response = await httpRequest.patch(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
