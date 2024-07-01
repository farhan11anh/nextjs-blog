import React from 'react';

const Modal: React.FC<{ onClose: () => void; children?: React.ReactNode }> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded w-80 p-4 relative">
        <button onClick={onClose} className="text-gray-500 absolute right-5 top-3 hover:text-gray-700 focus:outline-none">
          x
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;