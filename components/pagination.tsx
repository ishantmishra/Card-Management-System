// components/Pagination.tsx
import React from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav>
      <ul className="flex justify-center space-x-2 mt-4">
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={() => onPageChange(number)}
              className={`px-4 py-2 rounded-md ${number === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
