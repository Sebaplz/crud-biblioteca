import { useEffect } from "react";
import Loading from "../../util/Loading";
import TableAllUsers from "../../components/TableAllUsers";
import Pagination from "../../util/Pagination";
import useApiData from "../../hooks/useApiData";
import { Link } from "react-router-dom";
import { IconArrowBackUp } from "@tabler/icons-react";

export default function AllUsers() {
  const { data, isLoading, error, currentPage, totalPages, fetchData } =
    useApiData();

  const handlePageChange = (newPage) => {
    fetchData(import.meta.env.VITE_URL_ALLUSERS, newPage);
  };

  useEffect(() => {
    fetchData(import.meta.env.VITE_URL_ALLUSERS);
  }, []);

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}
      {isLoading ? (
        <Loading />
      ) : (
        <main className="mx-auto max-w-5xl pt-32">
          <div className="m-4 flex lg:m-0 lg:pb-4">
            <Link to={"/dashboard"}>
              <IconArrowBackUp color="#e02957" size={30} />
            </Link>
          </div>
          <TableAllUsers users={data} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </main>
      )}
    </>
  );
}
