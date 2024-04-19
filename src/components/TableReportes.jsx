import React, { useRef, useState, useEffect } from "react";
import Loading from "./Loading";
import useMovimientos from "../hooks/useMovimientos";
import useFilasFromMovimientos from "../hooks/useFilasFromMovimientos";
import { useReactToPrint } from 'react-to-print';
import TablaParaImprimir from "./TablaParaImprimir";
import useEliminarMovimiento from "../hooks/useEliminarMovimiento";
import ConfirmationModal from "./ConfirmationModal";
import TableModalModificarMovimiento from "./TableModalModificarMovimiento";

const TdStyle = {
  ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-bold text-white lg:py-7 lg:px-4`,
  TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium`,
  TdStyle2: `text-dark border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-base font-medium`,
  TdButton: `inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium`,
};

const TableReportes = ({ fechaInicio, fechaFin }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

    const [showPrintComponent, setShowPrintComponent] = useState(false);
    const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const [isTableModalOpen, setTableModalOpen] = useState(false); 
    const [selectedId, setSelectedId] = useState(null);
    const [selectedFactura, setSelectedFactura] = useState(null); 
  
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      onAfterPrint: () => setShowPrintComponent(false),
    });
  
  
    const handleOpenEditModal = (id, factura) => {
      setSelectedId(id);
      setSelectedFactura(factura);
      setTableModalOpen(true); 
    };
  
    const handleCloseEditModal = () => {
      setTableModalOpen(false);
    };
  

    const { movimientos, setMovimientos } = useMovimientos(fechaInicio, fechaFin, currentPage * itemsPerPage); 

  const { eliminarMov } = useEliminarMovimiento();
  

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
    const handlePrintButtonClick = () => {
      setShowPrintComponent(true); 
      handlePrint();
    };

    const handleUpdateMovimiento = (updatedMovimiento) => {
      setMovimientos((prevMovimientos) => {
        return prevMovimientos.map((mov) => {
          if (mov.id === updatedMovimiento.id) {
            return { ...mov, ...updatedMovimiento };
          }
          return mov; 
        });
      });
    };

    const { totalFilas } = useFilasFromMovimientos(fechaInicio, fechaFin);

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
      <section className="bg-gray-100 py-20 lg:py-[50px] w-full">
        <div className="container mx-auto">
        <div className="flex justify-center flex-grow ">
                <button onClick={handlePrintButtonClick} className={TdStyle.TdButton}>Imprimir Movimientos</button>
              </div>
        <p className="font-bold text-2xl mt-10 text-center md:w-1/2 mx-auto pb-10 ">Movimiento de Granito / Quarcita y Onix/ Mármol </p>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full">
              <div className="max-w-full overflow-x-auto">
                <div className="table-container" style={{ maxHeight: "700px", minHeight: "700px", overflowY: "auto" }}>
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
                        <th className={TdStyle.ThStyle}>Acciones</th>
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
                          <td className={TdStyle.TdStyle2}>{Number(mov.valorRegistro).toFixed(2)}</td>
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
        {showPrintComponent && 
        <div style={{ display: 'none' }}>
          <TablaParaImprimir ref={componentRef} fechaInicio={fechaInicio} fechaFin={fechaFin} />
        </div>
      }
       {isTableModalOpen && (
          <TableModalModificarMovimiento
          isOpen={isTableModalOpen}
          onClose={handleCloseEditModal}
          movimientoId={selectedId}
          numeroFactura={selectedFactura}
          onUpdate={handleUpdateMovimiento} 
        />
        )}
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirm}
        header={"Confirmación de eliminación"}
        message={"¿Estás seguro de que deseas eliminar el movimiento? Los cambios hechos en la plancha no se deshacerán, solo se borra el registro"}
      />
      </section>
    );
  };
  
  export default TableReportes;