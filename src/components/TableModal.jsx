import React from 'react';
import ReactDOM from 'react-dom';
import TableSalida from './TableSalida';

const TableModal = ({ isOpen, onClose, familiaSeleccionada, modeloSeleccionado }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded mb-4" onClick={onClose}>Cerrar</button>
        <div className="overflow-x-auto">
          <TableSalida 
          familiaSeleccionada={familiaSeleccionada}
          modeloSeleccionado={modeloSeleccionado}
          isModal={true}
          />
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default TableModal;