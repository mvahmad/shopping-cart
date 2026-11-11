'use client'
import { useMutation , useQueryClient , UseMutationOptions } from "@tanstack/react-query";
interface params<Data , Response>{
    mutationKey: string[];
    mutationFn: (data:Data)=>Promise<Response>;
    invalidate ?:string[],
    options ?:Omit<UseMutationOptions<Response, Error, Data>, "mutationKey" | "mutationFn">;
}

export const usePostServices =<Data , Response> ({
    mutationKey,mutationFn,invalidate,options
}:params<Data , Response>)=>{
    const queryClient = useQueryClient();
    return useMutation({
        ...options,
        mutationKey,
        mutationFn,
        // Always invalidate, then run the caller's onSuccess (onError etc. come from `options`).
        onSuccess:(data , variables , context)=>{
            if (invalidate) queryClient.invalidateQueries({ queryKey: invalidate });
            return options?.onSuccess?.(data, variables, context);
        },
    })
}
