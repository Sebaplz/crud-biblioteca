/* eslint-disable react/prop-types */
export default function Book({ book }) {
  return (
    <li className="flex flex-col items-center">
      <h2>{book.nombre}</h2>
      <img
        src={book.imagen}
        alt={`Imagen del libro ${book.nombre}`}
        className="h-80 w-72  object-center"
      />
      <h2>Autor: {book.autor}</h2>
    </li>
  );
}
