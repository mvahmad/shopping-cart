import { httpRequest } from "@/app/services/http-request";
import { ENDPOINTS } from "@/app/constant";

const PostSubCategory = async (data :{
    name:string;
    category:string
}) => {
    const url = ENDPOINTS.SUBCATEGORIES;
    const responce =await httpRequest.post(url,data);
    return responce.data
}
 
export default PostSubCategory;