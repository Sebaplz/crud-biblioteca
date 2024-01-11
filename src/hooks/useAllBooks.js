import { useEffect, useState } from "react";

const useAllBooks = () => {
  const [allbooks, setAllBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);

  const getAllBooks = async (page = 0, size = 5) => {
    const url = `http://localhost:8080/api/books?page=${page}&size=${size}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setAllBooks(data.content);
      setTotalPages(data.totalPages);
      setCurrentPage(data.pageable.pageNumber);
    } catch (error) {
      setError("No se pudo obtener la lista de libros!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  return { allbooks, isLoading, error, currentPage, totalPages, getAllBooks };
};

export default useAllBooks;
