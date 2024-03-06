import React, { useState } from "react";
import Loading from "./Loading";
import useMovimientos from "../hooks/useMovimientos";
import useFilasMovimientos from "../hooks/useFilasMovimientos";

const TdStyle = {
  ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-bold text-white lg:py-7 lg:px-4`,
  TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium`,
  TdStyle2: `text-dark border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-base font-medium`,
  TdButton: `inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium`,
};

const TableReportes = ({ fechaInicio, fechaFin }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    const { totalFilas } = useFilasMovimientos();

    const { movimientos } = useMovimientos(fechaInicio, fechaFin, currentPage * itemsPerPage);
    const totalPages = Math.ceil(totalFilas / itemsPerPage);
    console.log(itemsPerPage)
    console.log(totalFilas)
    console.log(totalPages)
  
    const nextPage = () => {
      setCurrentPage((prevCurrentPage) => (prevCurrentPage + 1) % totalPages);
    };
  
    const prevPage = () => {
      setCurrentPage((prevCurrentPage) => {
        if (prevCurrentPage - 1 < 0) {
          return totalPages - 1; // Regresa a la última página si prevCurrentPage es menor a 0
        } else {
          return (prevCurrentPage - 1) % totalPages;
        }
      });
    };
  
    if (movimientos.length === 0) {
      //return <Loading />;
    }
    return (
      <section className="bg-gray-100 py-20 lg:py-[50px] w-full">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full">
              <div className="max-w-full overflow-x-auto">
                <div className="table-container" style={{ maxHeight: "560px", minHeight: "300px", overflowY: "auto" }}>
                  <table className="w-full table-fixed">
                    <thead className="text-center bg-primary">
                      <tr>
                        <th className={TdStyle.ThStyle}>Tipo Movimiento</th>
                        <th className={TdStyle.ThStyle}>Bodega</th>
                        <th className={TdStyle.ThStyle}>Familia</th>
                        <th className={TdStyle.ThStyle}>Modelo</th>
                        <th className={TdStyle.ThStyle}>Plancha</th>
                        <th className={TdStyle.ThStyle}>Cód. Contable</th>
                        <th className={TdStyle.ThStyle}>Valor Registro</th>
                        <th className={TdStyle.ThStyle}>Factura</th>
                      </tr>
                    </thead>
                    <tbody>
                      {movimientos.map((mov, index) => (
                        <tr key={index}>
                          <td className={TdStyle.TdStyle2}>{mov.tipo}</td>
                          <td className={TdStyle.TdStyle}>{mov.nombreBodega}</td>
                          <td className={TdStyle.TdStyle2}>{mov.nombreFamilia}</td>
                          <td className={TdStyle.TdStyle}>{mov.nombreModelo}</td>
                          <td className={TdStyle.TdStyle2}>{mov.nombrePlancha}</td>
                          <td className={TdStyle.TdStyle}>{mov.CodigoContable}</td>
                          <td className={TdStyle.TdStyle2}>{mov.valorRegistro}</td>
                          <td className={TdStyle.TdStyle}>{mov.nFactura}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 py-2 flex flex-col justify-between items-center space-y-4">
            <div className="flex justify-center flex-grow">
              <button className="rounded-md bg-primary px-7 py-3 text-base font-medium text-white hover:bg-primary/90 mx-2" onClick={prevPage}>
                Anterior
              </button>
              <button className="rounded-md bg-primary px-7 py-3 text-base font-medium text-white hover:bg-primary/90 mx-2" onClick={nextPage}>
                Siguiente
              </button>
            </div>
            <div className="text-xl">
              Página {currentPage + 1} de {totalPages}
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default TableReportes;