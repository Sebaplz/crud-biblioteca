import { useEffect, useState } from "react";

const useAllBooks = () => {
  const [allbooks, setAllBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllBooks = async () => {
    const url = "http://localhost:8080/api/books";
    try {
      const response = await fetch(url);
      const data = await response.json();
      setAllBooks(data);
    } catch (error) {
      console.error(error);
      setError("Error al cargar...");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  return { allbooks, isLoading, error, getAllBooks };
};

export default useAllBooks;
