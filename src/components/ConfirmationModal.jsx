import React from 'react';
import ReactDOM from 'react-dom';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, header, message }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h4 className="text-xl font-bold mb-4">{header}</h4>
        <p>{message}</p>
        <div className="flex justify-end mt-4">
          <button className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded mr-2" onClick={onClose}>Cancelar</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') 
  );
};

export default ConfirmationModal;