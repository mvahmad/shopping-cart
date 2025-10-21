'use client'
// import AdminNav from "@/app/admin/components/adminNav";
import Link from "next/link";
import NextUiModal from "@/app/components/ui/nextUiModal";
// import { Button } from "@nextui-org/react";
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
import { useState ,useMemo } from "react";
import { useSearchParams } from 'next/navigation'
import { getProductsResponse ,ProductsEntity } from "@/app/types";
import { getProducts } from "@/app/hooks/queryHooks/products";
import { useGetServices } from "@/app/hooks/useGetServices";
import { useDeleteServices } from "@/app/hooks/useDeleteService";
import { DeleteProduct } from "@/app/hooks/queryHooks/products";
import { renderItem } from "@/utils/paginationRenderItem";
import  {useTableSort} from "@/app/hooks/useTabelSort"
import { toast } from "react-toastify";
import { MdOutlineDelete ,MdOutlineEdit } from "react-icons/md";
import { BiShow } from "react-icons/bi";
import useAdminStore from "@/app/store/admin/useAdminStore"
// import AdminDashboardPage from "../components/adminDashboardPage";
function AdminHomePage() {
    const [modalType, setModalType] = useState<string>("");
    const [product , setProduct] = useState({
      id:'0',
      name:'test'
    })
    // 
    const setSelectedItem = useAdminStore(state=>state.setSelectedItem)
    // 
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const {
      isOpen: isOpenDeleteModal,
      onOpen: onOpenDeleteModal,
      onOpenChange: onOpenChangeModal,
    } = useDisclosure();
    const searchParams = useSearchParams();
    const {  handleNameOrderColumn ,handlePageChange ,handleCategoryOrderColumn } =
    useTableSort();

    const limit = searchParams.get("limit") || "5";
    const sort = searchParams.get("sort") || "-createdAt";

    const params: {
      page: number;
      limit: string;
      sort: string | null;
    } = {
      page: Number(searchParams.get("page")) || 1,
      limit,
      sort,
    };

    //get products
    const {data , refetch ,isLoading} = useGetServices<getProductsResponse>({
      queryKey:["GetProducts",params] ,
      queryFn:()=>getProducts(params)
    })

    //delete product
    const { mutate } = useDeleteServices({
      mutationKey: ["DeleteProducts"],
      mutationFn: DeleteProduct,
      invalidate: ["GetProducts"],
      options: {
        onSuccess() {
          toast.success(`Product delete sucssesfully`);
          refetch();
        },
        onError(error) {
          toast.error(error.message, { rtl: false });
        },
      },
    });



    
    let items: ProductsEntity[] = [];
    if (data?.data.products?.length) {
      items = data.data.products;
    }


    const rowsPerPage = data?.per_page ? data?.per_page : 5;
    const pages = useMemo(()=>{
      return data?.total ? Math.ceil(data.total / rowsPerPage) : 0;
    },[data?.total,rowsPerPage])
    const loadingState =
    isLoading || data?.data.products?.length === 0 ? "loading" : "idle";

    function handleDeleteButton(id:string , name:string){
      // 
      setProduct({id ,name})
      onOpenDeleteModal();
    }

    function handleEditButton(item: ProductsEntity) {
      setSelectedItem({ id: item._id, name: item.name, items: item })
      onOpen();
      setModalType("edit");

    }

    function handelActionModal(){
      if(product){
        mutate(product.id , {
          onError:()=>{
            refetch()
          }
        })
      }
    }



    return ( 

    <div className="bg-gray-100 h-full px-8">
      
      <DropDown onOpen={onOpen}  setModalType={setModalType} />
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
              page={Number(searchParams.get("page")) || 1}
              total={pages}
              onChange={(page) => handlePageChange(page)}
            />
          </div>
        ) : null
      }
        className="cursor-default mt-2"
      >
        <TableHeader>

          <TableColumn key="thumbnail">Image</TableColumn>
          <TableColumn key="name" onClick={handleNameOrderColumn}>
          <Tooltip content="Sort by Product name" placement={"top-start"} showArrow={true}>
            Product Name
          </Tooltip>
          </TableColumn>
         
          <TableColumn
            key="category"
            onClick={handleCategoryOrderColumn}
          >
            <Tooltip content="Sort by Category name" placement={"top-start"} showArrow={true}>
            Category / SubCatagory
            </Tooltip>
          </TableColumn>
          <TableColumn key="action">Actions</TableColumn>
        </TableHeader>
        <TableBody loadingContent={<Spinner />} loadingState={loadingState} >

        {items.map((item:ProductsEntity)=>{
            return(
              <TableRow  key={item._id} className="border-b-1">
              <TableCell>
                <img
                  src={`http://localhost:8000/images/products/thumbnails/${item?.thumbnail}`}
                  alt={item.name}
                  className="w-16"
                />
              </TableCell>
              <TableCell className="text-[10px] mobile:text-sm px-1 mobile:px-3">
                <Link href={'#'}>{item.name}</Link>
              </TableCell>
              <TableCell className="text-[10px] mobile:text-sm px-1 mobile:px-3">{`${item.category.name} / ${item.subcategory.name}`}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-4 flex-col sm:flex-row">
                  <Tooltip
                    content="detail"
                    className="font-yekan cursor-default"
                  >
                    <Link href={`#`}>
                      <span className="text-lg text-default-900 cursor-pointer active:opacity-50">
                         <BiShow /> 
                      </span>
                    </Link>
                  </Tooltip>
                  <Tooltip
                    content="Edit"
                    className="font-yekan cursor-default"
                  >
                    <span
                      className="text-lg text-default-900 cursor-pointer active:opacity-50"
                      onClick={() => handleEditButton(item)}
                    >
                      <MdOutlineEdit />
                    </span>
                  </Tooltip>
                  <Tooltip
                    color="danger"
                    content="Delete"
                    className="font-yekan cursor-default"
                  >
                    <span
                      className="text-lg text-danger cursor-pointer active:opacity-50"
                      onClick={() => handleDeleteButton(item._id, item.name)}
                    >
                       <MdOutlineDelete />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>        
          )
          })}
        </TableBody>
      </Table>
      <FormModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        type={modalType}
        refetch={refetch}
        // onEdit={getSelectedItem}
      />
      <NextUiModal
        isOpen={isOpenDeleteModal}
        onOpenChange={onOpenChangeModal}
        onAction={handelActionModal}
        modalTitle={'Delete Product'}
        modalBody={"Are you sure you want to delete this product?"}
        buttonContent={["Cancel", " Delete"]}
      />
    </div>
   
  );
}

export default AdminHomePage;