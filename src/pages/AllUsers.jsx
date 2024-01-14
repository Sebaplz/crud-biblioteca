import { useEffect, useState } from "react";
import Loading from "../util/Loading";
import TableAllUsers from "../components/TableAllUsers";
import Pagination from "../util/Pagination";
import { useAuth } from "../auth/AuthProvider";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const { email } = useAuth();

  const handlePageChange = (newPage) => {
    getAllUsers(newPage);
  };

  const getAllUsers = async (page = 0, size = 5) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/user/users?page=${page}&size=${size}?email=${email}`,
      );
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        return;
      }
      const data = await response.json();
      setUsers(data.content);
      setCurrentPage(data.pageable.pageNumber);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <>
      {error && <p className="text-red-500">{error}</p>}
      {isLoading ? (
        <Loading />
      ) : (
        <main className="mx-auto max-w-5xl pt-32">
          <TableAllUsers users={users} />
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
