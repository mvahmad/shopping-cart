import { create } from "zustand";
import { Product } from "../types";
import { persist } from "zustand/middleware"
interface State{
    products :Product[]
    isLoading : boolean
    error : any
}
interface Action {
    fetchData : ()=> Promise<void>
}

const INITIAL_STATE : State = {
    products:[],
    isLoading : false,
    error : null
}

export const useProductStore = create<State & Action>(
     (set)=>(
        {
    products : INITIAL_STATE.products,
    isLoading : INITIAL_STATE.isLoading,
    error : INITIAL_STATE.error,
    fetchData : async ()=>{
        try{
            set({isLoading:true , error: null})
            const res = await fetch("https://dummyjson.com/products")
            const data = await res.json()
            set({products:data.products , isLoading:false})

        }catch(error){
            set({error : error , isLoading: false})
        }
    }

    })
)
