import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../util/Loading";
import { IconArrowBackUp } from "@tabler/icons-react";
import Error from "../util/Error";
import { useAuth } from "../auth/AuthProvider";

export default function InfoBook() {
  const [book, setBook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { userRol } = useAuth();

  const fetchBook = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/books/book/${id}`,
      );
      if (!response.ok) {
        setError(response.text);
      }
      const data = await response.json();
      setBook(data);
    } catch (error) {
      setError("No se pudo cargar el libro seleccionado!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          {error ? (
            <Error error={error} />
          ) : (
            <main className="mx-auto max-w-5xl pt-36 lg:pt-40">
              <div className="flex">
                <Link to={"/dashboard"}>
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
                  <div className="mt-10 flex items-center gap-4 lg:mt-16">
                    <p>Precio: ${book.precio}</p>
                    <button
                      className={`rounded-md bg-[#e02957] p-2 font-semibold text-white transition-transform hover:scale-105 ${
                        userRol === "USER"
                          ? ""
                          : "disabled:scale-100 disabled:bg-opacity-50 disabled:transition-none"
                      }`}
                      disabled={userRol !== "USER"}
                      onClick={() => print()}
                    >
                      Descargar
                    </button>
                  </div>
                </div>
              </div>
              {!userRol && (
                <p className="text-center text-red-500">
                  Debes iniciar sesión para descargarlo!
                </p>
              )}
            </main>
          )}
        </>
      )}
    </>
  );
}
