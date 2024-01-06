import Loading from "../util/Loading";
import Pagination from "../util/Pagination";
import Error from "../util/Error";
import useAllBooks from "../hooks/useAllBooks";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import BookList from "../components/BookList";

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
      <main className="mx-auto max-w-5xl pb-10 pt-40">
        {isLoading && <Loading />}
        {!isLoading && (
          <>
            {error ? (
              <Error error={error} />
            ) : (
              <>
                <BookList currentBooks={currentBooks} />
                <Pagination
                  totalBooks={allbooks.length}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  booksPerPage={booksPerPage}
                />
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}
