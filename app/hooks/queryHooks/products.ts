import { ENDPOINTS } from "@/app/constant";
import { httpServer as httpRequest } from "@/utils/http-server";
import { AddProductschema ,EditProduct } from "@/app/admin/components/schema";

export interface ParamsType {
  limit?: string;
  page?: number;
  sort?: string | null;
  category?: string;
  subcategory?: string;
}

export const getProducts = async (params?: ParamsType) => {
  const url = ENDPOINTS.PRODUCTS;
  const response = await httpRequest.get(url, { params });
  return response.data;
};


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
    if (data.thumbnail instanceof File) {
      formData.append("thumbnail", data.thumbnail);
    }
    if (data.images?.length) {
      data.images.forEach((img: string | Blob) => {
          if (img instanceof File) {
        formData.append("images", img);
      }
    });
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


export const getProductById = async (id: string) => {
  const url = `${ENDPOINTS.PRODUCTS}/${id}`;
  const response = await httpRequest.get(url);
  return response.data;
};

export const getProductsBySubCategory = async (subcategoryId: string) => {
  const url = `${ENDPOINTS.PRODUCTS}?subcategory=${subcategoryId}`;
  const response = await httpRequest.get(url);
  return response.data;
};
export const getProductsByCategory = async (categoryId: string) => {
  const url = `${ENDPOINTS.PRODUCTS}?category=${categoryId}`;
  const response = await httpRequest.get(url);
  return response.data;
};

export const patchProducts = async ({
  data,
  id,
}: {
  data: EditProduct;
  id: string;
}) => {
  const url = `${ENDPOINTS.PRODUCTS}/${id}`;
  const formData = new FormData();

  // Append basic fields
  formData.append("name", data.name);
  formData.append("category", data.category);
  formData.append("subcategory", data.subcategory);
  formData.append("brand", data.brand);
  formData.append("quantity", data.quantity.toString());
  formData.append("price", data.price.toString());
  formData.append("discount", data.discount.toString());
  //
  formData.append("description", data.description);

  // Handle thumbnail (can be File or string URL)
  if (data.thumbnail) {
    if (data.thumbnail instanceof File) {
      formData.append("thumbnail", data.thumbnail);
    } else if (typeof data.thumbnail === "string") {
      formData.append("thumbnail", data.thumbnail);
    }
  }

  // Handle images (array of File or string)
  if (data.images && data.images.length > 0) {
    for (const img of data.images) {
      if (img instanceof File) {
        formData.append("images", img);
      } else if (typeof img === "string") {
        formData.append("images", img);
      }
    }
  }

  const response = await httpRequest.patch(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

