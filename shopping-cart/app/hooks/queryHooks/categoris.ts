import { httpRequest } from "@/app/services/http-request";
import {ENDPOINTS } from "@/app/constant";
interface addCategorySchema{
    name:string,
    icon ?: FileList | undefined;
}

export const PostCategory = async(data:addCategorySchema)=>{
    const url = ENDPOINTS.CATEGORIES;
    const formData = new FormData();
    formData.append("name",data.name);
    if(data.icon){
        if (data.icon.length > 0){
            formData.append("icon", data.icon[0]);
        }
    }
    const responce = await httpRequest.post(url , formData,{ headers: {
        "Content-Type": "multipart/form-data",
      },})
    return responce.data
}