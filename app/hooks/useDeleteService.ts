'use client'
import {
    useMutation,
    UseMutationOptions,
    useQueryClient,
} from "@tanstack/react-query";

interface Params<Response> {
    mutationKey: string[];
    mutationFn: (id: string) => Promise<Response>;
    invalidate?: string[];
    options?: Omit<UseMutationOptions<Response, Error, string>, "mutationKey" | "mutationFn">;
}

export const useDeleteServices = <Response>({
    mutationKey,
    mutationFn,
    invalidate,
    options,
}: Params<Response>) => {
    const queryClient = useQueryClient();
    return useMutation({
      ...options,
      mutationKey,
      mutationFn,
      // Spread `options` first so a caller's onSuccess can't skip invalidation.
      onSuccess: (data, variables, context) => {
        if (invalidate) queryClient.invalidateQueries({ queryKey: invalidate });
        return options?.onSuccess?.(data, variables, context);
      },
    });
};
