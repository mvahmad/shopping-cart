import { httpServer as httpRequest } from "@/utils/http-server";
import { ENDPOINTS } from "@/app/constant";

const PostSubCategory = async (data :{
    name:string;
    category:string
}) => {
    const url = ENDPOINTS.SUBCATEGORIES;
    const responce =await httpRequest.post(url,data);
    return responce.data
}

export const DeleteSubCategory = async(id:string)=>{
    const url = `${ENDPOINTS.SUBCATEGORIES}/${id}`
    const responce  = await httpRequest.delete(url)
    return responce.data

}
 
export default PostSubCategory;