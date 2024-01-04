import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function Book({ book }) {
  return (
    <Link to={`/${book.id}`}>
      <li className="flex flex-col items-center">
        <img
          src={book.imagen}
          alt={`Imagen del libro ${book.nombre}`}
          className="h-80 w-72 rounded-lg object-center"
        />
        <h2>{book.nombre}</h2>
      </li>
    </Link>
  );
}
