import useAllBooks from "../hooks/useAllBooks";

export default function TableAllBooks() {
  const { allbooks, getAllBooks } = useAllBooks();

  const deleteBook = async (id) => {
    const url = `http://localhost:8080/api/books/delete/${id}`;
    const options = {
      method: "DELETE",
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error(error);
    } finally {
      getAllBooks();
    }
  };

  const editBook = () => {
    console.log("editar");
  };

  return (
    <div className="relative mx-4 overflow-x-auto rounded-lg shadow-md lg:mx-0">
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
              Precio
            </th>
            <th scope="col" className="px-6 py-3">
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          {allbooks.map((book) => (
            <tr key={book.id} className="border-b odd:bg-white even:bg-gray-50">
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                <img
                  src={book.imagen}
                  alt={book.nombre}
                  className="h-20 w-20 rounded-lg"
                />
              </th>
              <td className="px-6 py-4">{book.nombre}</td>
              <td className="px-6 py-4">{book.autor}</td>
              <td className="px-6 py-4">{book.precio}</td>
              <td className="flex h-[6.5rem] items-center gap-4">
                <button
                  onClick={() => editBook(book.id)}
                  className="font-medium text-blue-600 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteBook(book.id)}
                  className="font-medium text-[#e02957] hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
