import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function Book({ book }) {
  return (
    <>
      <li className="flex h-[300px] flex-col items-center justify-center rounded-lg">
        <Link to={`/book/${book.id}`}>
          <img
            src={book.image}
            alt={`Imagen del libro ${book.title}`}
            className="h-60 w-52 rounded-lg object-center"
          />
        </Link>
        <h2 className="w-52 truncate text-left font-semibold">{book.title}</h2>
        <h3 className="w-52 truncate text-left">{book.author}</h3>
      </li>
    </>
  );
}
