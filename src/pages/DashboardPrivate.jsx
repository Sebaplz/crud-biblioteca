import { Link } from "react-router-dom";
import TableAllBooks from "../components/TableAllBooks";
import Loading from "../util/Loading";
import Pagination from "../util/Pagination";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import useApiData from "../hooks/useApiData";

export default function DashboardPrivate() {
  const [message, setMessage] = useState(null);
  const { data, isLoading, error, currentPage, totalPages, fetchData } =
    useApiData();
  const { email } = useAuth();

  const handlePageChange = (newPage) => {
    fetchData(import.meta.env.VITE_URL_ALLBOOKS, newPage);
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
      fetchData(import.meta.env.VITE_URL_ALLBOOKS, currentPage);
    }
  };

  useEffect(() => {
    fetchData(import.meta.env.VITE_URL_ALLBOOKS);
  }, []);

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <main className="mx-auto max-w-5xl pt-32">
            <div className="flex justify-between">
              <Link
                to={"/users"}
                className="mb-5 rounded-md px-4 font-semibold text-[#e02957] transition-transform hover:scale-105 lg:py-2"
              >
                Ver Usuarios
              </Link>
              <Link
                to={"/addbook"}
                className="mb-5 rounded-md px-4 font-semibold text-[#e02957] transition-transform hover:scale-105 lg:py-2"
              >
                Agregar Libro
              </Link>
            </div>
            <TableAllBooks currentBooks={data} deleteBook={deleteBook} />
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
