import React, { useState } from 'react';
import useAgregarPlancha from '../hooks/useAgregarPlancha';
import ConfirmationModal from './ConfirmationModal';
import useAgregarMovimiento from '../hooks/useAgregarMovimiento';

const TdStyle = {
  ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-bold text-white lg:py-7 lg:px-4`,
  TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium`,
  InputSmall: `w-full max-w-xs px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-center`,
};

const TableIngreso = ({ modeloSeleccionado, bodegaSeleccionada}) => {
    const [values, setValues] = useState({
      factura: '',
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

    const { enviarPlancha } = useAgregarPlancha();
    const { enviarMovimiento } = useAgregarMovimiento();


    const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

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
      let value = e.target.value;
      const numericFields = ['alto', 'ancho', 'D1A', 'D1B', 'D2A', 'D2B', 'D3A', 'D3B'];
    
      if (numericFields.includes(field)) {

        value = value.replace(',', '.');
        
        // Permitir solo valores numéricos y decimales
        if (/^\d*\.?\d*$/.test(value) || value === '') {
          setValues({ ...values, [field]: value });
        }
      } else {
        // Para campos no numéricos, actualizar directamente
        setValues({ ...values, [field]: value });
      }
    };
  
    const handleSave = async () => {
      const { factura, COD, alto, ancho, D1A, D1B, D2A, D2B, D3A, D3B } = values;
      if (factura === '' || COD === '' || alto === '' || ancho === '' || D1A === '' || D1B === '' || D2A === '' || D2B === '' || D3A === '' || D3B === '') {
        alert('Por favor, complete todos los campos antes de guardar.');
        return;
      }
    
      const datosPlancha = {
        nombre: COD,
        alto: parseFloat(alto),
        ancho: parseFloat(ancho),
        despunte1A: parseFloat(D1A),
        despunte1B: parseFloat(D1B),
        despunte2A: parseFloat(D2A),
        despunte2B: parseFloat(D2B),
        despunte3A: parseFloat(D3A),
        despunte3B: parseFloat(D3B),
        modeloId: modeloSeleccionado,
        bodegaId: bodegaSeleccionada
      };
    
      try {
        const idPlancha = await enviarPlancha(datosPlancha);
    
        const datosMovimiento = {
          valorRegistro: `${COD}-${alto}-${ancho}-${D1A}-${D1B}-${D2A}-${D2B}-${D3A}-${D3B}`,
          planchaId: idPlancha,
          nFactura: factura,
          precioVenta: 0,
          tipo: "Ingreso",
        };
    
        await enviarMovimiento(datosMovimiento);
      } catch (error) {
        alert('Hubo un error al guardar la plancha o el movimiento.');
        console.error(error);
      }
    };

  return (
    <section className="bg-gray-100 py-20 lg:py-[50px] w-full">
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-fixed">
                <thead className="text-center bg-primary">
                  <tr>
                    <th className={TdStyle.ThStyle}>Factura</th>
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
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleOpenConfirmation}
              >
                Agregar plancha
              </button>
            </div>
          </div>
        </div>
      </div>
      <ConfirmationModal 
        isOpen={isConfirmationModalOpen} 
        onClose={handleCloseConfirmation} 
        onConfirm={handleConfirm} 
        message={"¿Estás seguro de que deseas agregar la plancha?"}
      />
    </section>
  );
};

export default TableIngreso;