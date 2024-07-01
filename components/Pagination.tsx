type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const generatePageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);

      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
          pageNumbers.push('...');
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push('...');
        }
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="pagination flex items-center justify-center space-x-2">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="px-2 py-1 rounded-md bg-gray-200 text-gray-600 disabled:bg-gray-300 disabled:text-gray-400"
      >
        &laquo; First
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 py-1 rounded-md bg-gray-200 text-gray-600 disabled:bg-gray-300 disabled:text-gray-400"
      >
        &lsaquo; Prev
      </button>
      {pageNumbers.map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`px-2 py-1 rounded-md w-16 ${
              currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-2 py-1">
            ...
          </span>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 py-1 rounded-md bg-gray-200 text-gray-600 disabled:bg-gray-300 disabled:text-gray-400"
      >
        Next &rsaquo;
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-2 py-1 rounded-md bg-gray-200 text-gray-600 disabled:bg-gray-300 disabled:text-gray-400"
      >
        Last &raquo;
      </button>
    </div>
  );
};

export default Pagination;
