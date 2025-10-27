"use server"
import AdminHomePage from "./products/page";
type SearchParams = Promise<Record<string, string>>;
export default async function AdminPage({ searchParams }: { searchParams: SearchParams }) {
  const resolvedParams = await searchParams;
  return <AdminHomePage searchParams={resolvedParams} />;
}
