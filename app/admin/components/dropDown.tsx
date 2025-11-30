'use client'
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
      <Dropdown className="" >
        <DropdownTrigger className="flex justify-between ">
          <button
            className="text-[11px] sm:text-xs bg-blue-500 text-white px-3 sm:px-4 py-2 
            rounded-xl shadow-sm hover:bg-blue-600 flex items-center justify-center gap-1 m-1"
          >
             + افزودن
          </button>
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
            // 
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
            key="deleteCategory"
            className="hover:bg-slate-300 p-2 rounded-md"
            endContent={<HiOutlineFolderPlus />}
          >
            Delete category
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    
    );
  }
  