import React, { useState } from "react";
import useMovimientosFromModeloUnitario from "../hooks/useMovimientosFromModeloUnitario";
import useFilasFromMovPorModeloUnitario from "../hooks/useFilasFromMovPorModeloUnitario";

const TdStyle = {
  ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-bold text-white lg:py-7 lg:px-4`,
  TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium`,
  TdStyle2: `text-dark border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-base font-medium`,
  TdButton: `inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium`,
};

const TableMovimientosPorModeloUnitario = ({ modeloSeleccionado }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
  
    const { movimientos } = useMovimientosFromModeloUnitario(modeloSeleccionado, currentPage * itemsPerPage);

    const { totalFilas } = useFilasFromMovPorModeloUnitario(modeloSeleccionado);
    console.log(totalFilas)

    const totalPages = Math.ceil(totalFilas / itemsPerPage);

  
    const nextPage = () => {
      setCurrentPage((prevCurrentPage) => (prevCurrentPage + 1) % totalPages);
    };
  
    const prevPage = () => {
      setCurrentPage((prevCurrentPage) => {
        if (prevCurrentPage - 1 < 0) {
          return totalPages - 1; 
        } else {
          return (prevCurrentPage - 1) % totalPages;
        }
      });
    };
  
    return (
      <section className="bg-gray-100 py-20 lg:py-[20px] w-full">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
          <p className="font-bold text-2xl mt-10 text-center md:w-1/2 mx-auto pb-10 "> Movimientos Realizados Por Modelo</p>
            <div className="w-full">
              <div className="max-w-full overflow-x-auto">
                <div className="table-container" style={{ maxHeight: "560px", minHeight: "490px", overflowY: "auto" }}>
                  <table className="w-full table-fixed">
                    <thead className="text-center bg-primary">
                      <tr>
                        <th className={TdStyle.ThStyle}>Fecha</th>
                        <th className={TdStyle.ThStyle}>Tipo</th>
                        <th className={TdStyle.ThStyle}>Cantidad Modificada</th>
                        <th className={TdStyle.ThStyle}>m2 Totales</th>
                        <th className={TdStyle.ThStyle}>Factura</th>
                      </tr>
                    </thead>
                    <tbody>
                      {movimientos.map((mov, index) => (
                        <tr key={index}>
                          <td className={TdStyle.TdStyle2}>{mov.createdAt}</td>
                          <td className={TdStyle.TdStyle}>{mov.tipo}</td>
                          <td className={TdStyle.TdStyle}>{mov.cantidadCambiada}</td>
                          <td className={TdStyle.TdStyle2}>{Number(mov.valorRegistro).toFixed(2)}</td>
                          <td className={TdStyle.TdStyle}>{mov.nFactura}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 py-2 flex flex-col justify-between items-center space-y-1">
            <div className="flex justify-center flex-grow">
              <button disabled={currentPage === 0} className="rounded-md bg-primary px-7 py-3 text-base font-medium text-white hover:bg-primary/90 mx-2" onClick={prevPage}>
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
  
  export default TableMovimientosPorModeloUnitario;