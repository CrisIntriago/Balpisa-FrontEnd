import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import TableSalida from './TableSalida';
import ConfirmationModal from './ConfirmationModal';

const TableModal = ({ isOpen, onClose, familiaSeleccionada, modeloSeleccionado }) => {
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const handleOpenConfirmation = () => {
    setConfirmationModalOpen(true);
  };

  const handleCloseConfirmation = () => {
    setConfirmationModalOpen(false);
  };

  const handleConfirm = () => {
    setConfirmationModalOpen(false);
    onClose();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="overflow-x-auto">
            <TableSalida 
              familiaSeleccionada={familiaSeleccionada}
              modeloSeleccionado={modeloSeleccionado}
              isModal={true}
            />
          </div>
          {/* Contenedor para el botón con Flexbox para centrarlo */}
          <div className="flex justify-center mt-4">
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" 
              onClick={handleOpenConfirmation}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>

      <ConfirmationModal 
        isOpen={isConfirmationModalOpen} 
        onClose={handleCloseConfirmation} 
        onConfirm={handleConfirm} 
      />
    </>,
    document.getElementById('modal-root')
);};
export default TableModal;