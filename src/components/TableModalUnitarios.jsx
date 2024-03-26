import React, { useState } from "react";
import ReactDOM from "react-dom";
import useCantidadesPorBodega from "../hooks/useCantidadesPorBodega";

const TdStyle = {
  ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-bold text-white lg:py-7 lg:px-4`,
  TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium`,
  TdStyle2: `text-dark border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-base font-medium`,
  TdButton: `inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium`,
  InputSmall: `w-full max-w-xs px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-center`,
  TableContainer: `max-h-[500px] overflow-y-auto`, // Estilo agregado
};

const TableModalUnitarios = ({ isOpen, onClose, modeloSeleccionado, modelo }) => {

    const { cantidades } = useCantidadesPorBodega(modeloSeleccionado); 

    if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
        <div className="relative bg-white p-6 rounded-lg shadow-lg">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 mt-4 mr-4 text-4xl p-4 font-semibold leading-none text-gray-600 hover:text-gray-900"
          >
            &times;
          </button>
          <div className="mt-16">
            <div className={`max-w-full overflow-x-auto ${TdStyle.TableContainer}`}>
              <p className="font-bold text-xl text-center md:w-1/2 lg:w-1/2 mx-auto pb-10">
                Detalle de stock para el modelo: {modelo}
              </p>
              <table className="w-full table-fixed">
                <thead className="text-center bg-primary">
                  <tr>
                    <th className={TdStyle.ThStyle}>Bodega</th>
                    <th className={TdStyle.ThStyle}>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
  {cantidades.length > 0 ? (
    cantidades.map(({ cantidad, nombre }) => (
      <tr key={nombre}>
        <td className={TdStyle.TdStyle}>{nombre}</td>
        <td className={TdStyle.TdStyle2}>{cantidad}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5" style={{ textAlign: 'center' }}>No hay datos para mostrar</td>
    </tr>
  )}
</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('modal-root')
  );
};

export default TableModalUnitarios;