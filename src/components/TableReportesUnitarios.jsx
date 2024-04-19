import React, { useState } from "react";
import Loading from "./Loading";
import useMovimientosUnitarios from "../hooks/useMovimientosUnitarios";
import useFilasFromMovimientosUnitarios from "../hooks/useFilasFromMovimientosUnitarios";
import useEliminarMovimientoUnitario from "../hooks/useEliminarMovimientoUnitario";
import ConfirmationModal from "./ConfirmationModal";
import TableModalModificarMovimientoUnitario from "./TableModalModificarMovimientoUnitario";



const TdStyle = {
  ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-bold text-white lg:py-7 lg:px-4`,
  TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium`,
  TdStyle2: `text-dark border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-base font-medium`,
  TdButton: `inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium`,
};
const TableReportes = ({ fechaInicio, fechaFin }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [selectedId, setSelectedId] = useState(null);
  const [selectedMovimiento, setSelectedMovimiento] = useState(null); 
  const itemsPerPage = 5;

  const { totalFilas } = useFilasFromMovimientosUnitarios(fechaInicio, fechaFin);
  const { movimientos, setMovimientos } = useMovimientosUnitarios(fechaInicio, fechaFin, currentPage * itemsPerPage);
  const { eliminarMov } = useEliminarMovimientoUnitario();

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

  const handleOpenEditModal = (id, movimiento) => {
    setSelectedId(id);
    setSelectedMovimiento(movimiento);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleUpdateMovimientoUnitario = (updatedMovimiento) => {
    setMovimientos((prevMovimientos) => {
      return prevMovimientos.map((mov) => {
        if (mov.id === updatedMovimiento.id) {
          return { ...mov, ...updatedMovimiento };
        }
        return mov;
      });
    });
    handleCloseEditModal();
  };

  const handleOpenConfirmation = (id) => {
    setSelectedId(id);
    setConfirmationModalOpen(true);
  };

  const handleCloseConfirmation = () => {
    setConfirmationModalOpen(false);
  };

  const handleConfirm = async () => {
    await eliminarMov(selectedId);
    setMovimientos(movs => movs.filter(mov => mov.id !== selectedId));
    handleCloseConfirmation();
  };

  return (
    <section className="bg-gray-100 py-20 lg:py-[50px] w-full">
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full">
            <div className="max-w-full overflow-x-auto">
              <div className="table-container" style={{ maxHeight: "650px", minHeight: "650px", overflowY: "auto" }}>
                <table className="w-full table-fixed">
                  <thead className="text-center bg-primary">
                    <tr>
                      <th className={TdStyle.ThStyle}>Tipo Movimiento</th>
                      <th className={TdStyle.ThStyle}>Nombre</th>
                      <th className={TdStyle.ThStyle}>Cód. Contable</th>
                      <th className={TdStyle.ThStyle}>Cantidad Cambiada</th>
                      <th className={TdStyle.ThStyle}>Valor Registro</th>
                      <th className={TdStyle.ThStyle}>Factura</th>
                      <th className={TdStyle.ThStyle}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movimientos.map((mov, index) => (
                      <tr key={index}>
                        <td className={TdStyle.TdStyle2}>{mov.tipo}</td>
                        <td className={TdStyle.TdStyle}>{mov.nombre}</td>
                        <td className={TdStyle.TdStyle2}>{mov.codContable}</td>
                        <td className={TdStyle.TdStyle}>{mov.cantidadCambiada}</td>
                        <td className={TdStyle.TdStyle2}>{mov.valorRegistro}</td>
                        <td className={TdStyle.TdStyle}>{mov.nFactura}</td>
                        <td className={TdStyle.TdStyle2}>
                          <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleOpenEditModal(mov.id, mov.nFactura)
              }}
              className={`${TdStyle.TdButton} mb-2`} 
            >
              Editar
            </a>
                          
                          <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleOpenConfirmation(mov.id); 
              }}
              className={TdStyle.TdButton}
            >
              Eliminar
            </a>
                        </td>
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
      {isEditModalOpen && (
          <TableModalModificarMovimientoUnitario
            isOpen={isEditModalOpen}
            onClose={handleCloseEditModal}
            movimientoId={selectedId}
            numeroFactura={selectedMovimiento}
            onUpdate={handleUpdateMovimientoUnitario}
          />
        )}
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirm}
        header={"Confirmación de eliminación"}
        message={"¿Estás seguro de que deseas eliminar este movimiento? Los cambios hechos en la plancha no se deshacerán, solo se borra el registro"}
      />
    </section>
  );
};

export default TableReportes;