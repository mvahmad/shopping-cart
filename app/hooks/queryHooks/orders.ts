import { ENDPOINTS } from "@/app/constant"
import { Icart } from "@/app/product/type"
import { httpRequest } from "@/app/services/http-request"

export const postOrder = async(data:Icart)=>{
    const url = `${ENDPOINTS.ORDERS}`
    const responce = await httpRequest.post(url , data)
    return responce.data

}