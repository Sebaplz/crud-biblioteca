import Loading from "../util/Loading";
import Pagination from "../util/Pagination";
import Book from "../components/Book";
import useAllBooks from "../hooks/useAllBooks";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function DashboardPublic() {
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  const { allbooks, isLoading, error } = useAllBooks();

  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = allbooks.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <>
      <Navbar />
      {error && (
        <p className="text-center font-semibold text-red-600">{error}</p>
      )}
      <main className="mx-auto max-w-5xl pb-10 pt-40">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <ul className="grid w-full grid-cols-1 items-center justify-center gap-4 md:grid-cols-2 lg:grid-cols-3">
              {currentBooks.length === 0 ? (
                <p>No hay libros para mostrar.</p>
              ) : (
                currentBooks.map((book) => <Book key={book.id} book={book} />)
              )}
            </ul>
            <Pagination
              totalBooks={allbooks.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              booksPerPage={booksPerPage}
            />
          </>
        )}
      </main>
    </>
  );
}
