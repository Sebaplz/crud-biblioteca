/* eslint-disable react/prop-types */
import Book from "./Book";

export default function BookList({ currentBooks }) {
  return (
    <>
      {currentBooks.length === 0 ? (
        <p>No hay libros para mostrar.</p>
      ) : (
        <ul className="grid w-full grid-cols-1 items-center justify-center gap-4 md:grid-cols-2 lg:grid-cols-3">
          {currentBooks.map((book) => (
            <Book key={book.id} book={book} />
          ))}
        </ul>
      )}
    </>
  );
}
