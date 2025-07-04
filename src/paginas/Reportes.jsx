import React, { useState } from 'react';
import TableReportes from '../components/TableReportes';
import TableReportesUnitarios from '../components/TableReportesUnitarios';

const Reportes = () => {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [tablaVisible, setTablaVisible] = useState(false);


  const handleBuscarClick = () => {
    if (fechaInicio !== '' && fechaFin !== '') {
      setTablaVisible(true);
    } else {
      alert("Por favor, completa todas las secciones requeridas.");
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 pb-5">
      <p className="font-bold text-3xl mt-10 text-center md:w-1/2 mx-auto pb-10 ">Reporte de movimientos por fecha</p>
      <div className="flex justify-center my-4 mx-4 md:mx-auto w-full md:w-3/4 lg:w-1/3">
        <div className='mr-14'>
          <p>Fecha Inicio</p>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded w-60"
          />
        </div>

        <div className='ml-14'>
          <p>Fecha Fin</p>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded w-60"
          />
        </div>
      </div>

      <button
        onClick={handleBuscarClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-2 px-4 rounded"
      >
        Buscar
      </button>

      {tablaVisible && (
        <TableReportes
          fechaInicio={fechaInicio}
          fechaFin={fechaFin}
        />
      )}
      {
        tablaVisible &&
        <p className="font-bold text-2xl mt-10 text-center md:w-1/2 mx-auto pb-10 ">Movimiento de Porcelanato, Cerámica </p>
      }


      {tablaVisible && (
        <TableReportesUnitarios
          fechaInicio={fechaInicio}
          fechaFin={fechaFin}
        />
      )}

    </div>
  );
};

export default Reportes;