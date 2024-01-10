import Loading from "../util/Loading";
import Pagination from "../util/Pagination";
import Error from "../util/Error";
import useAllBooks from "../hooks/useAllBooks";
import BookList from "../components/BookList";

export default function DashboardPublic() {
  const { allbooks, isLoading, error, currentPage, totalPages, getAllBooks } =
    useAllBooks();

  const handlePageChange = (newPage) => {
    getAllBooks(newPage, 6, `nombre,desc`);
  };

  return (
    <>
      <main className="mx-auto max-w-5xl pb-10 pt-40">
        {isLoading && <Loading />}
        {!isLoading && (
          <>
            {error ? (
              <Error error={error} />
            ) : (
              <>
                <BookList currentBooks={allbooks} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePageChange={handlePageChange}
                />
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}
