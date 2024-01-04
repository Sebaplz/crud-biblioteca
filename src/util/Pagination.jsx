/* eslint-disable react/prop-types */
const Pagination = ({
  currentPage,
  booksPerPage,
  totalBooks,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalBooks / booksPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <nav
      aria-label="Page navigation"
      className="flex justify-center pt-4 lg:pt-10"
    >
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`${
              currentPage === 1 ? "pointer-events-none" : ""
            } ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700`}
          >
            Anterior
          </button>
        </li>
        {[...Array(totalPages).keys()].map((page) => (
          <li key={page + 1}>
            <button
              onClick={() => handlePageChange(page + 1)}
              className={`${
                currentPage === page + 1 ? "bg-blue-50 text-blue-600" : ""
              } flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700`}
            >
              {page + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`${
              currentPage === totalPages ? "pointer-events-none" : ""
            } flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700`}
          >
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
