import { Link } from "react-router-dom";
import TableAllBooks from "../components/TableAllBooks";
import useAllBooks from "../hooks/useAllBooks";
import Loading from "../util/Loading";
import Pagination from "../util/Pagination";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
export default function DashboardPrivate() {
  const [message, setMessage] = useState(null);
  const { allbooks, isLoading, error, currentPage, totalPages, getAllBooks } =
    useAllBooks();
  const { email } = useAuth();

  const handlePageChange = (newPage) => {
    getAllBooks(newPage);
  };

  const deleteBook = async (id) => {
    const url = `${import.meta.env.VITE_URL_DELETEBOOK}/${id}?email=${email}`;
    const options = {
      method: "DELETE",
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setMessage(data.message);
      setTimeout(() => {
        setMessage(null);
      }, 1500);
    } catch (error) {
      console.error(error);
    } finally {
      getAllBooks(currentPage);
    }
  };

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <main className="mx-auto max-w-5xl pt-32">
            <div className="flex justify-end">
              <Link
                to={"/addbook"}
                className="mb-5 rounded-md px-4 font-semibold text-[#e02957] transition-transform hover:scale-105 lg:py-2"
              >
                Agregar Libro
              </Link>
            </div>
            <TableAllBooks currentBooks={allbooks} deleteBook={deleteBook} />
            {message && <p className="pt-2 text-center">{message}</p>}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </main>
        </>
      )}
    </>
  );
}
