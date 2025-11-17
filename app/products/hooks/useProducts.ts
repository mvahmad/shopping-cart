"use client";
import { useQuery } from "@tanstack/react-query";
import { getProducts,ParamsType } from "@/app/hooks/queryHooks/products";

export const useProducts = (params?: ParamsType) =>
  useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
  });
