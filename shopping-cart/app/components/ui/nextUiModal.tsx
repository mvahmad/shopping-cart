import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
  } from "@nextui-org/react";
  
interface props {
    isOpen: boolean;
    onOpenChange: () => void;
    onAction: () => void;
    modalBody: string;
    modalTitle: string;
    buttonContent: string[];
  }
  
export default function NextUiModal({
    isOpen,
    onOpenChange,
    modalBody,
    modalTitle,
    buttonContent,
    onAction,
  }: props) {
    return (
      <>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          isKeyboardDismissDisabled={true}
          className= "cursor-default"
        >
          <ModalContent>
            {(onClose : any) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {modalTitle}
                </ModalHeader>
                <ModalBody>
                  <p>{modalBody}</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary"  onPress={onClose}>
                    {buttonContent[0]}
                  </Button>
                  <Button
                    color="primary"
                    className="bg-red-500"
                    onPress={() => {
                      onAction();
                      onClose();
                    }}
                  >
                    {buttonContent[1]}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  