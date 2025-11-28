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


// export const PostProduct =async (data:AddProductschema) => {
//     const url = ENDPOINTS.PRODUCTS;
//     const formData = new FormData();
//     formData.append("name", data.name);
//     formData.append("category", data.category);
//     formData.append("subcategory", data.subcategory);
//     formData.append("price", data.price.toString());
//     formData.append("quantity", data.quantity.toString());
//     formData.append("discount", data.discount.toString());
//     formData.append("brand", data.brand);
//     formData.append("description", data.description);
//     if (data.thumbnail instanceof File) {
//       formData.append("thumbnail", data.thumbnail);
//     }
//     if (data.images?.length) {
//       data.images.forEach((img: string | Blob) => {
//           if (img instanceof File) {
//         formData.append("images", img);
//       }
//     });
//   }
//     const response = await httpRequest.post(url, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return response.data;
// }

export const PostProduct = async (data: AddProductschema) => {
  const url = ENDPOINTS.PRODUCTS;

  // Send JSON instead of FormData
  const payload = {
    name: data.name,
    category: data.category,
    subcategory: data.subcategory,
    price: data.price,
    quantity: data.quantity,
    discount: data.discount,
    brand: data.brand,
    description: data.description,
    thumbnail: data.thumbnail,   // string URL
    images: data.images || []    // string[]
  };

  const response = await httpRequest.post(url, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};


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

  // Since frontend already uploads images, we can just send JSON
  const payload = {
    name: data.name,
    category: data.category,
    subcategory: data.subcategory,
    brand: data.brand,
    quantity: data.quantity,
    price: data.price,
    discount: data.discount,
    description: data.description,
    thumbnail: data.thumbnail, // string URL
    images: data.images,       // array of string URLs
  };

  const response = await httpRequest.patch(url, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};


