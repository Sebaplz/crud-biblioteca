/* eslint-disable react/prop-types */
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ModalPopUp from "../util/ModalPopUp";

export default function TableAllBooks({ currentBooks, deleteBook }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleDelete = () => {
    if (selectedBook) {
      deleteBook(selectedBook.id);
      setOpenModal(false);
    }
  };

  return (
    <>
      <div className="relative mx-4 overflow-x-auto rounded-lg shadow-md lg:mx-2 2xl:mx-0">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Imagen
              </th>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Autor
              </th>
              <th scope="col" className="px-6 py-3">
                Páginas
              </th>
              <th scope="col" className="px-6 py-3">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map((book) => (
              <tr
                key={book.id}
                className="border-b odd:bg-white even:bg-gray-50"
              >
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  <Link to={`/book/${book.id}`}>
                    <img
                      src={book.image}
                      alt={book.title}
                      className="h-20 w-20 rounded-lg"
                    />
                  </Link>
                </th>
                <td className="px-6 py-4">{book.title}</td>
                <td className="px-6 py-4">{book.author}</td>
                <td className="px-6 py-4">{book.pages}</td>
                <td className="flex h-[6.5rem] items-center gap-4">
                  <Link
                    to={`/edit/${book.id}`}
                    className="flex gap-1 font-medium text-blue-600 hover:underline"
                  >
                    <IconEdit color="#2563EB" size={20} />
                    Editar
                  </Link>
                  <button
                    className="flex gap-1 pr-4 font-medium text-[#e02957] hover:underline"
                    onClick={() => {
                      setSelectedBook(book);
                      setOpenModal(true);
                    }}
                  >
                    Eliminar
                    <IconTrash color="#e02957" size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedBook && (
        <ModalPopUp
          openModal={openModal}
          setOpenModal={setOpenModal}
          book={selectedBook}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
}
