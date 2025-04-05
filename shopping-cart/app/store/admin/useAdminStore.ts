import { create } from "zustand";
import { persist } from "zustand/middleware"
import { Product } from "@/app/types";

interface State{
    id:string;
    name:string;
}