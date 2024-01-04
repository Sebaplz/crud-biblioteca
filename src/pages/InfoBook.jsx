import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../util/Loading";
import Navbar from "../components/Navbar";
import { IconArrowBackUp } from "@tabler/icons-react";

export default function InfoBook() {
  const [book, setBook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const fetchBook = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/books/${id}`);
      if (!response.ok) {
        setError(response.text);
      }
      const data = await response.json();
      setBook(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  return (
    <>
      <Navbar />
      {error && <p className="text-red-500">{error}</p>}
      {isLoading ? (
        <Loading />
      ) : (
        <main className="mx-auto max-w-5xl pt-36 lg:pt-40">
          <div className="flex">
            <Link to={"/"}>
              <IconArrowBackUp color="#e02957" size={30} />
            </Link>
          </div>
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-center">
            <img
              src={book.imagen}
              alt={book.nombre}
              className="h-64 w-52 lg:h-80 lg:w-64"
            />
            <div className="p-4">
              <h2 className="max-w-md text-4xl">{book.nombre}</h2>
              <h3 className="text-lg">{book.autor}</h3>
              <p className="mt-8 max-w-lg">Sinopsis: {book.sinopsis}</p>
              <p className="mt-10 lg:mt-16">Precio: ${book.precio}</p>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
