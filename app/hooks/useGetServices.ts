"use client"
import { useQuery , UseQueryOptions } from "@tanstack/react-query";

interface Params<Response> {
    queryKey: unknown[];
    queryFn: () => Promise<Response>;
    enabled?: boolean,
    options?: Omit<UseQueryOptions<Response, Error>, "queryKey" | "queryFn">;
    initialData?:Response
  }

export const useGetServices = <Response>({
    queryKey,
    queryFn,
    initialData,
    enabled,
    options,
  }: Params<Response>) => {
    return useQuery({
      ...options,
      queryKey,
      queryFn,
      initialData,
      ...(enabled !== undefined ? { enabled } : {}),
    });
};
