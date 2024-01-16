/* eslint-disable react/prop-types */
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function ModalPopUp({
  book,
  setOpenModal,
  openModal,
  handleDelete,
}) {
  return (
    <>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-[#e02957]" />
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              ¿Estás seguro de eliminar el libro: {book.title}?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => handleDelete(book.id)}>
                Sí, estoy seguro!
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
