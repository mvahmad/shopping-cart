"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export function useTableSort() {
  const searchParams = useSearchParams(); // read-only
  const pathname = usePathname();
  const router = useRouter();

  const limit = searchParams.get("limit") || "5";
  const currentParams = Object.fromEntries(searchParams.entries());

  // helper: update URL with new params
  function setSearchParams(newParams: Record<string, string>) {
    const updated = new URLSearchParams({
      ...currentParams,
      ...newParams,
    });
    router.push(`${pathname}?${updated.toString()}`);
  }

  function handlePriceOrderColumn() {
    const newSort = currentParams.sort === "price" ? "-price" : "price";
    setSearchParams({ sort: newSort });
  }

  function handleInventoryOrderColumn() {
    const newSort =
      currentParams.sort === "quantity" ? "-quantity" : "quantity";
    setSearchParams({ sort: newSort });
  }

  function handlePageChange(page: number) {
    setSearchParams({ page: page.toString(), limit });
  }

  function handleNameOrderColumn() {
    const newSort = currentParams.sort === "name" ? "-name" : "name";
    setSearchParams({ sort: newSort });
  }

  function handleCategoryOrderColumn() {
    const newSort =
      currentParams.sort === "category" ? "-category" : "category";
    setSearchParams({ sort: newSort });
  }

  function handleCreatedAtOrderColumn() {
    const newSort =
      currentParams.sort === "createdAt" ? "-createdAt" : "createdAt";
    setSearchParams({ sort: newSort });
  }

  function handleTotalPriceOrderColumn() {
    const newSort =
      currentParams.sort === "totalPrice" ? "-totalPrice" : "totalPrice";
    setSearchParams({ sort: newSort });
  }

  return {
    handleCreatedAtOrderColumn,
    handlePriceOrderColumn,
    handleTotalPriceOrderColumn,
    handleInventoryOrderColumn,
    handlePageChange,
    handleNameOrderColumn,
    handleCategoryOrderColumn,
  };
}
