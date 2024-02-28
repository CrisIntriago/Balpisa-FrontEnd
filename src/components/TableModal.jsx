import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import ConfirmationModal from './ConfirmationModal';
import useActualizarPlancha from '../hooks/useActualizarPlancha';

const TdStyle = {
  ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-bold text-white lg:py-7 lg:px-4`,
  TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium`,
  TdStyle2: `text-dark border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-base font-medium`,
  TdButton: `inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium`,
  InputSmall: `w-full max-w-xs px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-center`
};

const TableModal = ({ isOpen, onClose, planchaSeleccionada}) => {
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [values, setValues] = useState({
    COD: '',
    alto: '',
    ancho: '',
    D1A: '',
    D1B: '',
    D2A: '',
    D2B: '',
    D3A: '',
    D3B: '',
  });

  //const { enviarPlancha } = useAgregarPlancha();
  const { enviarPlanchaActualizada } = useActualizarPlancha();

  const handleOpenConfirmation = () => {
    setConfirmationModalOpen(true);
  };

  const handleCloseConfirmation = () => {
    setConfirmationModalOpen(false);
  };

  const handleConfirm = () => {
    setConfirmationModalOpen(false);
    handleSave();
  };

  const handleInputChange = (e, field) => {
    setValues({ ...values, [field]: e.target.value });
  };

  const handleSave = async () => {
    const { COD, alto, ancho, D1A, D1B, D2A, D2B, D3A, D3B } = values;
    if (!COD || !alto || !ancho || !D1A || !D1B || !D2A || !D2B || !D3A || !D3B) {
      alert('Por favor, complete todos los campos antes de guardar.');
      return;
    }

    const datosPlancha = {
      nombre: COD,
      alto,
      ancho,
      despunte1A: D1A,
      despunte1B: D1B,
      despunte2A: D2A,
      despunte2B: D2B,
      despunte3A: D3A,
      despunte3B: D3B,
    };

    try {
      await enviarPlanchaActualizada(planchaSeleccionada, datosPlancha);
      //await enviarPlancha(datosPlancha);
      onClose();
      alert('La plancha ha sido guardada con éxito.');
    } catch (error) {
      alert('Hubo un error al guardar la plancha.');
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="max-w-full overflow-x-auto">
        <table className="w-full table-fixed">
                <thead className="text-center bg-primary">
                  <tr>
                  <th className={TdStyle.ThStyle}>COD</th>
                    <th className={TdStyle.ThStyle}>Alto</th>
                    <th className={TdStyle.ThStyle}>Ancho</th>
                    <th className={TdStyle.ThStyle}>D1A</th>
                    <th className={TdStyle.ThStyle}>D1B</th>
                    <th className={TdStyle.ThStyle}>D2A</th>
                    <th className={TdStyle.ThStyle}>D2B</th>
                    <th className={TdStyle.ThStyle}>D3A</th>
                    <th className={TdStyle.ThStyle}>D3B</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {Object.keys(values).map((key) => (
                      <td key={key} className={TdStyle.TdStyle}>
                        <input
                          className={TdStyle.InputSmall}
                          type="text"
                          value={values[key]}
                          onChange={(e) => handleInputChange(e, key)}
                        />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            
          
          <div className="flex justify-center mt-4">
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white mx-5 py-2 px-4 rounded" 
              onClick={handleOpenConfirmation}
            >Confirmar
            </button>
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white mx-5 py-2 px-4 rounded" 
              onClick={onClose}
            >
              Cancelar 
            </button>
          </div>
        </div>
      </div>

      <ConfirmationModal 
        isOpen={isConfirmationModalOpen} 
        onClose={handleCloseConfirmation} 
        onConfirm={handleConfirm} 
        message={"¿Estás seguro de que deseas modificar los datos de la plancha?"}
      />
    </>,
    document.getElementById('modal-root')
);};
export default TableModal;