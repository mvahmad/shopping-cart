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
            Add
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Static Actions"
          className=""
          onAction={(key: Key) => handleDropDownItem(key)}
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
  