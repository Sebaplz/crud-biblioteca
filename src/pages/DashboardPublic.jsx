import Loading from "../util/Loading";
import Pagination from "../util/Pagination";
import Error from "../util/Error";
import BookList from "../components/BookList";
import useApiData from "../hooks/useApiData";
import { useEffect } from "react";

export default function DashboardPublic() {
  const { data, isLoading, error, currentPage, totalPages, fetchData } =
    useApiData();

  const handlePageChange = (newPage) => {
    fetchData(import.meta.env.VITE_URL_ALLBOOKS, newPage);
  };

  useEffect(() => {
    fetchData(import.meta.env.VITE_URL_ALLBOOKS);
  }, []);

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
                <BookList currentBooks={data} />
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
