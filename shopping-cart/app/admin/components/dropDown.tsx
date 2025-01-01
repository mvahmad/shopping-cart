import {
  Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
  } from "@nextui-org/react";
import {  } from "@nextui-org/react";  
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
            className="bg-slate-50 w-[10rem] border-slate-400 border-1.5 rounded-lg  p-3"
            endContent={<GoPlusCircle  />}
          >
            Add
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Static Actions"
          className="z-10 bg-slate-50 border-1.5 w-[10rem] rounded-md p-3 flex flex-col gap-3 "
          // onAction={(key: Key) => handleDropDownItem(key)}
        >
          <DropdownItem
            key="product"
            endContent={<GoPlusCircle  />}
            className="hover:bg-slate-300 p-2 rounded-md"
          >
            Product
          </DropdownItem>
  
          <DropdownItem
            key="category"
            textValue="cart"
            endContent={<HiOutlineFolderPlus />}
            className="hover:bg-slate-300 p-2 rounded-md"
          >
            Category
          </DropdownItem>
          <DropdownItem
            key="sub-category"
            className="hover:bg-slate-300 p-2 rounded-md"
            endContent={<HiOutlineDocumentPlus />}
          >
            Subcategory
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    
    );
  }
  