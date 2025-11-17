"use client"
import { useQuery , UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface Params<Response> {
    queryKey: unknown[];
    queryFn: (data: unknown) => Promise<Response>;
    enabled?: boolean,
    options?: Omit<UseQueryOptions<Response, Error, AxiosResponse>, "queryKey">;
    initialData?:Response
  }
  
export const useGetServices = <Response>({
    queryKey,
    queryFn,
    initialData,
    ...options
  }: Params<Response>) => {
    return useQuery({
      queryKey,
      queryFn,
      initialData,
      ...options,
    });
};