import Loading from "../util/Loading";
/* import Pagination from "../util/Pagination"; */
import Book from "../components/Book";
import useAllBooks from "../hooks/useAllBooks";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function DashboardPublic() {
  const { allbooks, isLoading, error } = useAllBooks();

  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <>
      <Navbar />
      {error && (
        <p className="text-center font-semibold text-red-600">{error}</p>
      )}
      <main className="mx-auto max-w-5xl pt-40">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <ul className="grid w-full grid-cols-1 items-center justify-center gap-4 md:grid-cols-2 lg:grid-cols-3">
              {allbooks.length == 0 ? (
                <p>No hay libros para mostar!</p>
              ) : (
                allbooks.map((book) => <Book key={book.id} book={book} />)
              )}
            </ul>
            {/* <Pagination /> */}
          </>
        )}
      </main>
    </>
  );
}
