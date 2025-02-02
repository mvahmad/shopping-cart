import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import AddCategoryForm from "./addCategoryform";
import AddSubcategoryForm from "./addSubcategoryForm";
interface props{
    isOpen: boolean;
    onOpenChange: () => void;
    onClose: () => void;
    type: string
}
const FormModal = ({isOpen ,type, onClose , onOpenChange}:props) => {
    const handleFormModalType =(type:string) =>{
        switch (type) {
            case "product":
              return {
                modalTitle: " Add Product ",
                // modalBody: <AddProductForm onClose={onClose} />,
              };
            case "edit":
              return {
                modalTitle: "Edit Product ",
                // modalBody: <EditProductForm onClose={onClose} />,
              };
            case "category":
              return {
                modalTitle: " Add Category ",
                modalBody: <AddCategoryForm onClose={onClose} />,
              };
            case "sub-category":
              return {
                modalTitle: " Add Subcategory ",
                modalBody: <AddSubcategoryForm onClose={onClose} />,
              };
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
            className="font-yekan cursor-default"
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