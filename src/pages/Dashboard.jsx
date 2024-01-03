import { useEffect, useState } from "react";
import Loading from "../util/Loading";
/* import Pagination from "../util/Pagination"; */
import Book from "../components/Book";
import Navbar from "../components/Navbar";

export default function Dashboard() {
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

  const deleteBook = async (id) => {
    const url = `http://localhost:8080/api/books/delete/${id}`;
    const options = {
      method: "DELETE",
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error(error);
    } finally {
      getAllBooks();
    }
  };

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
              {allbooks.map((book) => (
                <Book key={book.id} book={book} onDelete={deleteBook} />
              ))}
            </ul>
            {/* <Pagination /> */}
          </>
        )}
      </main>
    </>
  );
}
