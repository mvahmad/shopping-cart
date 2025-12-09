"use client";
import Link from "next/link";
import NextUiModal from "@/app/components/ui/nextUiModal";
// UI Imports
import {
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import FormModal from "@/app/admin/components/formModal";
import DropDown from "@/app/admin/components/dropDown";
import { useState, useMemo } from "react";
import { getProductsResponse, ProductsEntity } from "@/app/types";
import { getProducts, DeleteProduct } from "@/app/hooks/queryHooks/products";
import { useGetServices } from "@/app/hooks/useGetServices";
import { useDeleteServices } from "@/app/hooks/useDeleteService";
// Utils Imports
import { renderItem } from "@/utils/paginationRenderItem";
import { useTableSort } from "@/app/hooks/useTabelSort";
import { toast } from "react-toastify";
// import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { BiShow } from "react-icons/bi";
import useAdminStore from "@/app/store/admin/useAdminStore";

// interface AdminHomePageProps {
//   searchParams: Record<string, string>;
// }

interface AdminHomePageProps {
  limit: string;
  sort: string;
  page: number;
}

export default function ProductsPage({ limit, sort, page }: AdminHomePageProps) {
  const [modalType, setModalType] = useState<string>("");
  const [product, setProduct] = useState({ id: "0", name: "test" });
  const setSelectedItem = useAdminStore((state) => state.setSelectedItem);
  const params = { page, limit, sort };
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onOpenChange: onOpenChangeModal,
  } = useDisclosure();

  const { handleNameOrderColumn, handlePageChange, handleCategoryOrderColumn } =
    useTableSort();


  // Fetch data
  const { data, refetch, isLoading } = useGetServices<getProductsResponse>({
    queryKey: ["GetProducts", params],
    queryFn: () => getProducts(params),
  });

  // Delete mutation
  const { mutate } = useDeleteServices({
    mutationKey: ["DeleteProducts"],
    mutationFn: DeleteProduct,
    invalidate: ["GetProducts"],
    options: {
      onSuccess() {
        toast.success(`Product deleted successfully`);
        refetch();
      },
      onError(error) {
        toast.error(error.message, { rtl: false });
      },
    },
  });

  const items: ProductsEntity[] = data?.data.products || [];
  const rowsPerPage = data?.per_page || 5;

  const pages = useMemo(() => {
    return data?.total ? Math.ceil(data.total / rowsPerPage) : 0;
  }, [data?.total, rowsPerPage]);

  const loadingState =
    isLoading || data?.data.products?.length === 0 ? "loading" : "idle";

  function handleDeleteButton(id: string, name: string) {
    setProduct({ id, name });
    onOpenDeleteModal();
  }

  function handleEditButton(item: ProductsEntity) {
    setSelectedItem({ id: item._id, name: item.name, items: item });
    onOpen();
    setModalType("edit");
  }

  function handleActionModal() {
    if (product) {
      mutate(product.id, {
        onError: () => {
          refetch();
        },
      });
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-sm sm:text-base font-semibold">محصولات</h1>
             <DropDown onOpen={onOpen} setModalType={setModalType} />
        </div>

      <Table
        bottomContent={
          pages > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                dir="rtl"
                renderItem={renderItem}
                showControls
                size="sm"
                showShadow
                radius="md"
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => handlePageChange(page)}
              />
            </div>
          ) : null
        }
        aria-label="admin-product"
        className="w-full text-[11px] sm:text-xs text-slate-600">
        <TableHeader className="border-b bg-slate-50">
          <TableColumn key="thumbnail">عکس محصول</TableColumn>
          <TableColumn key="name" onClick={handleNameOrderColumn}>
            <Tooltip
              content="مرتب سازی بر اساس نام محصول"
              placement={"top-start"}
              showArrow={true}
            >
              نام محصول
            </Tooltip>
          </TableColumn>
          <TableColumn key="category" onClick={handleCategoryOrderColumn}>
            <Tooltip
              content="مرتب سازی بر اساس مجموعه / زیرمجموعه"
              placement={"top-start"}
              showArrow={true}
            >
              مجموعه / زیرمجموعه
            </Tooltip>
          </TableColumn>
          <TableColumn key="price">قیمت</TableColumn>
          <TableColumn key="inventory">موجودی</TableColumn>
          <TableColumn key="stting">تنظیمات</TableColumn>
        </TableHeader>

        <TableBody loadingContent={<Spinner />} loadingState={loadingState}>
          {items.map((item: ProductsEntity) => (
            <TableRow key={item._id} className="border-b-1">
              <TableCell>
                <img
                  src={item?.thumbnail}
                  alt={item.name}
                  className="w-16"
                />
              </TableCell>
              <TableCell className="text-sm px-1 ">
                <Link href={"#"}>{item.name}</Link>
              </TableCell>
              <TableCell className="text-sm px-1">
                {` ${item.subcategory?.name || 'N/A'} / ${item.category?.name || 'N/A'}`}
              </TableCell>
              <TableCell>{item.price.toLocaleString()} تومان</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-4 flex-col sm:flex-row">
                  <Tooltip content="جزئیات" className="font-yekan cursor-default">
                    <Link href={`/products/${item._id}`}>
                      <span className="text-lg text-default-900 cursor-pointer active:opacity-50">
                        <BiShow />
                      </span>
                    </Link>
                  </Tooltip>
                  <Tooltip content="ویرایش" className="font-yekan cursor-default">
                    <span
                      className="text-lg text-default-900 cursor-pointer active:opacity-50"
                      onClick={() => handleEditButton(item)}
                    >
                      ✏️
                    </span>
                  </Tooltip>
                  <Tooltip
                    color="danger"
                    content="حذف"
                    className="font-yekan cursor-default"
                  >
                    <span
                      className="text-lg text-danger cursor-pointer active:opacity-50"
                      onClick={() => handleDeleteButton(item._id, item.name)}
                    >
                      🗑️
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <FormModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        type={modalType}
        refetch={refetch}
        // 
      />

      <NextUiModal
        isOpen={isOpenDeleteModal}
        onOpenChange={onOpenChangeModal}
        onAction={handleActionModal}
        modalTitle={"Delete Product"}
        modalBody={"برای حذف این محصول مطمئن هستید؟"}
        buttonContent={["لغو", "حذف"]}
      />
    </div>
    
  );
}
// 







