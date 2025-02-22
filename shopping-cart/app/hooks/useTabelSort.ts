import { url } from "inspector";
import { useSearchParams,useRouter,usePathname } from "next/navigation";
export function useTableSort() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const  router = useRouter();
  const currentParams = new URLSearchParams(searchParams.toString());
 
  const limit = searchParams.get("limit") || "5";
 

  function handlePriceOrderColumn() {
    console.log(currentParams);
    
    currentParams.set("price",'price')
    console.log(currentParams);
  }
//   function handleInventoryOrderColumn() {
//     const newSort =
//       currentParams.sort === "quantity" ? "-quantity" : "quantity";
//     setSearchParams({ ...currentParams, sort: newSort });
//   }
  function handlePageChange(page: number) {
   
    currentParams.set("page",page.toString())
    
  }
  function handleNameOrderColumn() {
    currentParams.set("sort",'name')
    router.push(`?${currentParams.toString()}`, { scroll: false });

  }
  function handleCategoryOrderColumn() {
    console.log("before",currentParams.get("sort"));
    
      currentParams.set("sort",'category')
      router.push(`?${currentParams.toString()}`, { scroll: false });
      console.log("After",currentParams.get("sort"));
  }
//   function handleCreatedAtOrderColumn() {
//     const newSort =
//       currentParams.sort === "createdAt" ? "-createdAt" : "createdAt";
//     setSearchParams({ ...currentParams, sort: newSort });
//   }
//   function handleTotalPriceOrderColumn() {
//     const newSort =
//       currentParams.sort === "totalPrice" ? "-totalPrice" : "totalPrice";
//     setSearchParams({ ...currentParams, sort: newSort });
//   }

  return {
    // handleCreatedAtOrderColumn,
    handlePriceOrderColumn,
    // handleTotalPriceOrderColumn,
    // handleInventoryOrderColumn,
    handlePageChange,
    handleNameOrderColumn,
    handleCategoryOrderColumn,
  };
}
