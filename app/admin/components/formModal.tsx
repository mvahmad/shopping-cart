import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import AddCategoryForm from "./addCategoryform";
import AddSubcategoryForm from "./addSubcategoryForm";
import AddProductForm from "./addProductForm";
import EditProductForm from "./editProductForm";
import DeleteSubCategoryForm from "./deleteSubCategoryForm";
import DeleteCategoryForm from "./deleteCategoryForm";
interface props{
    isOpen: boolean;
    onOpenChange: () => void;
    onClose: () => void;
    type: string
    refetch?:()=>void
    // onEdit?:()=>void
} 
const FormModal = ({isOpen ,type, onClose , onOpenChange , refetch ,}:props) => {
    const handleFormModalType =(type:string) =>{
        switch (type) {
            case "product":
              return {
                modalTitle: " Add Product ",
                modalBody: <AddProductForm onClose={onClose} refetch={refetch} />,
              };
            case "edit":
              return {
                modalTitle: "Edit Product ",
                modalBody: <EditProductForm onClose={onClose} refetch={refetch}  />,
              };
            case "category":
              return {
                modalTitle: " Add Category ",
                modalBody: <AddCategoryForm onClose={onClose} />,
              };
            case "subCategory":
              return {
                modalTitle: " Add Subcategory ",
                modalBody: <AddSubcategoryForm onClose={onClose} />,
              };
            case "deleteSubCategory" :
              return {
                modalTitle: " Delete Subcategory ",
                modalBody : <DeleteSubCategoryForm onClose={onClose} />
             };
             case "deleteCategory" :
              return {
                modalTitle:" Delete Category ",
                modalBody : <DeleteCategoryForm onClose={onClose} />
              }
          }
    }
    return (
        <>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            className="cursor-default"
            scrollBehavior="inside"
          >
            <ModalContent>
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {handleFormModalType(type)?.modalTitle}
                </ModalHeader>
                <ModalBody>
                    {handleFormModalType(type)?.modalBody}

                </ModalBody> 
              </>
            </ModalContent>
          </Modal>
        </>
    )
}
 
export default FormModal;