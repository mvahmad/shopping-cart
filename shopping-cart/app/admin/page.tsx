'use client'
import AdminHeader from "./components/adminHeader";
import Link from "next/link";
import NextUiModal from "../components/ui/nextUiModal";
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
import DropDown from "./components/dropDown";
import { useState } from "react";
function AdminHome() {
    const [modalType, setModalType] = useState("");
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const {
        isOpen: isOpenDeleteModal,
        onOpen: onOpenDeleteModal,
        onOpenChange: onOpenChangeModal,
      } = useDisclosure();

      function handleActionModal() {
       console.log("test");
        }




    return ( 
    <>
    <AdminHeader />
    <div className="LayoutContainer  md:px-16 cursor-default">
      <h2 className="text-2xl text-value-gray font-semibold py-6">
        Product Management
      </h2>
      <DropDown onOpen={onOpen} setModalType={setModalType} />
      <Table
        aria-label="Example static collection table"
        className="py-3 cursor-default"
      >
        <TableHeader>
          <TableColumn key="thumbnail">Image</TableColumn>
          <TableColumn key="name" allowsSorting >
            Product Name
          </TableColumn>
          <TableColumn
            key="category"
          
            allowsSorting
          >
            Category
          </TableColumn>
          <TableColumn key="action">Actions</TableColumn>
        </TableHeader>
        <TableBody loadingContent={<Spinner />} >

            <TableRow className="border-b-1">
              <TableCell>
                {/* <img
                  src={``}
                  
                  className="w-16"
                /> */}
                image
              </TableCell>
              <TableCell className="text-[10px] mobile:text-sm px-1 mobile:px-3">
                <Link href={'#'}>Link</Link>
              </TableCell>
              <TableCell className="text-[10px] mobile:text-sm px-1 mobile:px-3">{`category name / subcategory name`}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-4 flex-col sm:flex-row">
                  <Tooltip
                    content="detail"
                    className="font-yekan cursor-default"
                  >
                    <Link href={`#`}>
                      <span className="text-lg text-default-900 cursor-pointer active:opacity-50">
                        {/* <EyeIcon className="size-3 mobile:size-auto" /> */}
                      </span>
                    </Link>
                  </Tooltip>
                  <Tooltip
                    content="Edit"
                    className="font-yekan cursor-default"
                  >
                    <span
                      className="text-lg text-default-900 cursor-pointer active:opacity-50"
                      // onClick={() => handleEditButton(item)}
                    >
                      {/* <EditIcon className="size-3 mobile:size-auto" /> */}
                    </span>
                  </Tooltip>
                  <Tooltip
                    color="danger"
                    content="Delete"
                    className="font-yekan cursor-default"
                  >
                    <span
                      className="text-lg text-danger cursor-pointer active:opacity-50"
                      // onClick={() => handleDeleteButton(item._id, item.name)}
                    >
                      {/* <DeleteIcon className="size-3 mobile:size-auto" /> */}
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          <TableRow  className="border-b-1">
              <TableCell>
                <img
                  src={`#`}
                //   alt={item.name}
                  className="w-16"
                />
              </TableCell>
              <TableCell className="text-[10px] mobile:text-sm px-1 mobile:px-3">
                <Link href={`#`}>#</Link>
              </TableCell>
              <TableCell className="text-[10px] mobile:text-sm px-1 mobile:px-3">
                {`category.name /subcategory.name}`}
                </TableCell>
              <TableCell> 
                <div className="relative flex items-center gap-4 flex-col sm:flex-row">
                  <Tooltip
                    content="Detail"
                    className="font-yekan cursor-default"
                  >
                    {/* <Link to={`/book/${item._id}`}>
                      <span className="text-lg text-default-900 cursor-pointer active:opacity-50">
                        <EyeIcon className="size-3 mobile:size-auto" />
                      </span>
                    </Link> */}
                  </Tooltip>
                  <Tooltip
                    content="Edit"
                    className="font-yekan cursor-default"
                  >
                    <span
                      className="text-lg text-default-900 cursor-pointer active:opacity-50"
                    //   onClick={() => handleEditButton(item)}
                    >
                      {/* <EditIcon className="size-3 mobile:size-auto" /> */}
                    </span>
                  </Tooltip>
                  <Tooltip
                    color="danger"
                    content="Delete"
                    className="font-yekan cursor-default"
                  >
                    <span
                      className="text-lg text-danger cursor-pointer active:opacity-50"
                    //   onClick={() => handleDeleteButton(item._id, item.name)}
                    >
                      {/* <DeleteIcon className="size-3 mobile:size-auto" /> */}
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
  
      <NextUiModal
        isOpen={isOpenDeleteModal}
        onOpenChange={onOpenChangeModal}
        onAction={handleActionModal}
        modalTitle={'حذف'}
        modalBody="این عملیات حذف دائمی داده‌ها را به همراه دارد و قابل برگشت نیست. همچنین تمامی اطلاعات مرتبط با این آیتم نیز از دست خواهند رفت."
        buttonContent={["انصراف", "حذف کتاب"]}
      />
    </div>
    </> );
}

export default AdminHome;