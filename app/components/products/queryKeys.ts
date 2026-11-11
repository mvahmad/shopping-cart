// Shared between the server page (prefetch) and the client component so the
// dehydrated cache entry is actually reused on the client.
export const productsQueryKey = (
  page: number,
  limit: string,
  categoryId: string,
  subcategoryId: string
) => ["GetProducts", page, limit, categoryId, subcategoryId] as const;
