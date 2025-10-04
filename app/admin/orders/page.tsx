"use client";
import { getOrders } from "@/app/hooks/queryHooks/orders";
import { useGetServices } from "@/app/hooks/useGetServices";
import { OrdersResponse } from "../orders/ordersResponse";
import TableOrders from "../components/tableOrders";
import { Tab, Tabs } from "@nextui-org/react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useTableSort } from "@/app/hooks/useTabelSort";


const Orders = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { handleTotalPriceOrderColumn, handleCreatedAtOrderColumn } = useTableSort();

  const limit = searchParams.get("limit") || "5";
  const sort = searchParams.get("sort") || "-createdAt";
  const page = Number(searchParams.get("page")) || 1;

  // build params for API call
  const params = { page, limit, sort };

  // fetch all Orderdata
  const {
    data: orderData,
    refetch: refetchOrderData,
    isLoading: isLoadingOrderData,
  } = useGetServices<OrdersResponse>({
    queryKey: ["GetOrders", params],
    queryFn: () => getOrders(params),
  });
    
   // fetch deleverdData
   const {
    data: deliveredOrdersData,
    isLoading: isLoadingDeliveredOrders,
    refetch: refetchGetDeliveredOrders,
  } = useGetServices<OrdersResponse>({
    queryKey: ["GetDeliveredOrders", params],
    queryFn: () => getOrders(params, true),
  });
  
  //fetch waitingOrdersData
  const {
    data: waitingOrdersData,
    isLoading: isLoadingWaitingOrders,
    refetch: refetchGetWaitingOrders,
  } = useGetServices<OrdersResponse>({
    queryKey: ["GetWaitingOrders", params],
    queryFn: () => getOrders(params, false),
  });

  // update URL params
  function handlePageChange(newPage: number) {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("page", newPage.toString());
    currentParams.set("limit", limit);
    router.push(`${pathname}?${currentParams.toString()}`);
  }

  function refetch() {
    refetchOrderData();
    refetchGetDeliveredOrders();
    refetchGetWaitingOrders();
  }

  return (
    <Tabs  color="primary" aria-label="Options">
        <Tab key="waiting-orders" title='سفارشات در انتظار تحویل '>
            <TableOrders 
            refetch={refetch}
            data={waitingOrdersData}
            isLoading={isLoadingWaitingOrders}
            handlePageChange={handlePageChange}
            searchParams={searchParams}
            handlePriceSorting={handleTotalPriceOrderColumn}
            handleCreatedAtSorting={handleCreatedAtOrderColumn}
            />
      </Tab>
      <Tab key="delever-Product" title='سفارشات تحویل شده'>
        <TableOrders 
          data={deliveredOrdersData}
          refetch={refetch}
          isLoading={isLoadingDeliveredOrders}
          handlePageChange={handlePageChange}
          searchParams={searchParams}
          handlePriceSorting={handleTotalPriceOrderColumn}
          handleCreatedAtSorting={handleCreatedAtOrderColumn}
        />
      </Tab>
       <Tab key="all" title="همه سفارشات">
        <TableOrders
          data={orderData}
          isLoading={isLoadingOrderData}
          refetch={refetch}
          handlePageChange={handlePageChange}
          searchParams={searchParams}
          handlePriceSorting={handleTotalPriceOrderColumn}
          handleCreatedAtSorting={handleCreatedAtOrderColumn}
        />
      </Tab>
      
    </Tabs>
  );
};

export default Orders;
