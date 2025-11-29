"use server"
import ProductsPage from "../components/productsPage";
type SearchParams = Promise<Record<string, string>>;
export default async function AdminPage({ searchParams }: { searchParams: SearchParams }) {
  const resolvedParams = await searchParams;
  const limit = resolvedParams.limit || "5";
  const sort = resolvedParams.sort || "-createdAt";
  const page = Number(resolvedParams.page) || 1;

   return <ProductsPage
        limit={limit}
        sort={sort}
        page={page}
      />;
  }
  
