import { Link } from "react-router-dom";
import TableAllBooks from "../components/TableAllBooks";
import useAllBooks from "../hooks/useAllBooks";
import Loading from "../util/Loading";

export default function DashboardPrivate() {
  const { isLoading, error } = useAllBooks();
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
                className="mb-5 rounded-md px-4 py-2 font-semibold text-[#e02957] transition-transform hover:scale-105"
              >
                Agregar Libro
              </Link>
            </div>
            <TableAllBooks />
          </main>
        </>
      )}
    </>
  );
}
