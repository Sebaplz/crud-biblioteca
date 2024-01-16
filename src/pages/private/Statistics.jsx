import { useEffect, useState } from "react";
import Loading from "../../util/Loading";
import { Card, DonutChart, Title } from "@tremor/react";
import { Link } from "react-router-dom";
import { IconArrowBackUp } from "@tabler/icons-react";

export default function Statistics() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL_DOWNLOADS}`);
      if (!response.ok) {
        setError(response.text);
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      setError("No se pudo cargar los libros");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <main className="mx-auto max-w-5xl pt-32">
            <div className="flex">
              <Link to={"/dashboard"}>
                <IconArrowBackUp color="#e02957" size={30} />
              </Link>
            </div>
            <section className="flex flex-col items-center p-4">
              <Card className="max-w-md">
                <Title className="text-center">Libros descargados</Title>
                <DonutChart
                  className="mt-6"
                  data={books}
                  category="downloads"
                  index="title"
                  colors={[
                    "rose",
                    "yellow",
                    "orange",
                    "indigo",
                    "blue",
                    "emerald",
                    "slate",
                    "violet",
                    "cyan",
                    "amber",
                  ]}
                />
              </Card>
            </section>
          </main>
        </>
      )}
    </>
  );
}
