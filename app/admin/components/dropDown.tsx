import {
  
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
  } from "@nextui-org/dropdown";
import {Button } from "@nextui-org/button";  
import { Key } from "react";
import { GoPlusCircle } from "react-icons/go";
import { HiOutlineFolderPlus, HiOutlineDocumentPlus } from "react-icons/hi2";
interface props {
    onOpen: () => void;
    setModalType: (type: string) => void;
  }
  
export default function DropDown({ onOpen, setModalType }: props) {
    function handleDropDownItem(key: Key) {
      setModalType(`${key}`);
      onOpen();
    }
    return (
      <Dropdown className="">
        <DropdownTrigger className="flex justify-between ">
          <Button
            variant="bordered"
            className=""
            endContent={<GoPlusCircle  />}
          >
            Setting
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Static-Actions"
          className=""
          onAction={(key: Key) => handleDropDownItem(key)}
        >
          <DropdownItem
            key="product"
            endContent={<GoPlusCircle  />}
            className="hover:bg-slate-300 p-2 rounded-md"
          >
           Add Product
          </DropdownItem>
  
          <DropdownItem
            key="category"
            textValue="cart"
            endContent={<HiOutlineFolderPlus />}
            className="hover:bg-slate-300 p-2 rounded-md"
          >
           Add Category
          </DropdownItem>
          <DropdownItem
            key="subCategory"
            className="hover:bg-slate-300 p-2 rounded-md"
            endContent={<HiOutlineDocumentPlus />}
          >
          Add Subcategory
          </DropdownItem>
          <DropdownItem
            key="deleteSubCategory"
            className="hover:bg-slate-300 p-2 rounded-md"
            endContent={<HiOutlineDocumentPlus />}
          >
           Delete Subcategory
          </DropdownItem>
          <DropdownItem
            key="delete-category"
            className="hover:bg-slate-300 p-2 rounded-md"
            endContent={<HiOutlineFolderPlus />}
          >
            Delete category
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    
    );
  }
  