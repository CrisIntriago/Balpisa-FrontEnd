import React, { useState, useEffect, useMemo } from "react";
import Loading from "./Loading";
import useModelosUnitariosCompletos from "../hooks/useModelosUnitariosCompletos";
import TableModalUnitarios from "./TableModalUnitarios";

const TdStyle = {
  ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-bold text-white lg:py-7 lg:px-4`,
  TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium`,
  TdStyle2: `text-dark border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-base font-medium`,
  TdButton: `inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium`,
};

const TableBusquedaModeloUnitario = ({ familiaSeleccionada, modeloSeleccionado }) => {
  const { modelosCompletos } = useModelosUnitariosCompletos(familiaSeleccionada);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const [modalInfo, setModalInfo] = useState({ isOpen: false, selectedId: null, nombre: null });

  const onVerCantidadesClick = (id, nombre) => {
    setModalInfo({ isOpen: true, selectedId: id, nombre: nombre });
  };

  const handleClose = () => {
    setModalInfo({ isOpen: false, selectedId: null });
  };
  useEffect(() => {
    setCurrentPage(0);
  }, [familiaSeleccionada, modeloSeleccionado]);

  // Calcula los elementos filtrados fuera del render
  const filteredElements = useMemo(() => {
    let filtered = modelosCompletos;
    if (familiaSeleccionada !== '' && modeloSeleccionado !== '') {
      filtered = modelosCompletos.filter(modelo => modelo.id === modeloSeleccionado);
    }
    return filtered;
  }, [modelosCompletos, familiaSeleccionada, modeloSeleccionado]);

  const totalItems = filteredElements.length;
  const maxPage = Math.ceil(totalItems / itemsPerPage);

  const nextPage = () => {
    if (currentPage < maxPage - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Obtiene los elementos para la página actual
  const currentElements = () => {
    const startIndex = currentPage * itemsPerPage;
    return filteredElements.slice(startIndex, startIndex + itemsPerPage);
  };

  if (!familiaSeleccionada) {
    return <Loading />;
  }


  return (
    <section className="bg-gray-100 py-20 lg:py-[50px] w-full">
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full">
            <div className="max-w-full overflow-x-auto">
              <div
                className="table-container"
                style={{
                  maxHeight: "560px",
                  minHeight: "560px",
                  overflowY: "auto",
                }}
              >
                <table className="w-full table-fixed">
                  <thead className="text-center bg-primary">
                    <tr>
                      <th className={TdStyle.ThStyle}>Modelo</th>
                      <th className={TdStyle.ThStyle}>Unidades</th>
                      <th className={TdStyle.ThStyle}>m<sup>2</sup> Disponibles</th>
                      <th className={TdStyle.ThStyle}>Precio/m<sup>2</sup></th>
                      <th className={TdStyle.ThStyle}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Llamada a currentElements para obtener y mapear los elementos de la página actual */}
                    {currentElements().map(({ id, nombre, unidades, m2Disponibles, preciom2 }) => (
                      <tr key={id}>
                        <td className={TdStyle.TdStyle}>{nombre}</td>
                        <td className={TdStyle.TdStyle2}>{unidades}</td>
                        <td className={TdStyle.TdStyle}>{m2Disponibles}</td>
                        <td className={TdStyle.TdStyle2}>{preciom2}</td>
                        <td className={TdStyle.TdStyle2}>
                        <a
                          href="/#"
                          onClick={(e) => {
                            e.preventDefault();
                            onVerCantidadesClick(id, nombre);
                          }}
                          className={TdStyle.TdButton}
                        >
                          Ver en Bodegas
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
            <button
              className="rounded-md bg-primary px-7 py-3 text-base font-medium text-white hover:bg-primary/90 mx-2"
              onClick={prevPage}
            >
              Anterior
            </button>
            <button
              className="rounded-md bg-primary px-7 py-3 text-base font-medium text-white hover:bg-primary/90 mx-2"
              onClick={nextPage}
            >
              Siguiente
            </button>
          </div>
          <div className="text-xl">
            Página {currentPage + 1} de {maxPage}
          </div>
        </div>
      </div>
      <TableModalUnitarios isOpen={modalInfo.isOpen} onClose={handleClose} modeloSeleccionado={modalInfo.selectedId} modelo={modalInfo.nombre}/>
    </section>
  );
};

export default TableBusquedaModeloUnitario;