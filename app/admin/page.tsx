"use server"
import OverviewSection from "./overview/page";
type SearchParams = Promise<Record<string, string>>;
export default async function AdminPage({ searchParams }: { searchParams: SearchParams }) {
  return <OverviewSection/>;
}
