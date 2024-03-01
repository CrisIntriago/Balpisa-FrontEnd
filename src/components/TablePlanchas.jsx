import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import useallPlanchas from "../hooks/useallPlanchas";

const TdStyle = {
  ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-bold text-white lg:py-7 lg:px-4`,
  TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium`,
  TdStyle2: `text-dark border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-base font-medium`,
  TdButton: `inline-block px-3 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium`,
}


const TablePlanchas = ({ modeloSeleccionado, bodegaSeleccionada }) => {
  const { planchas } = useallPlanchas(modeloSeleccionado, bodegaSeleccionada);
  const [currentPage, setCurrentPage] = useState(0);
  const [mostrarAgotadas, setMostrarAgotadas] = useState(false); // Nuevo estado para el checkbox
  const itemsPerPage = 5;

  useEffect(() => {
    setCurrentPage(0); // Reinicia la página actual al cambiar de modelo o bodega
  }, [modeloSeleccionado, bodegaSeleccionada, planchas.length, mostrarAgotadas]);

  // Filtra planchas basadas en mostrarAgotadas antes de calcular totalItems y maxPage
  const planchasFiltradas = mostrarAgotadas ? planchas : planchas.filter(plancha => plancha.estado === 1);

  const totalItems = planchasFiltradas.length;
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

  const currentPlanchas = () => {
    const startIndex = currentPage * itemsPerPage;
    return planchasFiltradas.slice(startIndex, startIndex + itemsPerPage);
  };

  if (!modeloSeleccionado || !bodegaSeleccionada) {
    return <Loading />;
  }


  return (
<section className="bg-gray-100 py-20 lg:py-[50px] w-full">
      {/* Contenedor y demás elementos de UI */}
      <div className="container mx-auto">
        {/* Más elementos de UI */}
        <div className="w-full">
        <div className="mb-4">
            <label>
              <input
                type="checkbox"
                checked={mostrarAgotadas}
                onChange={(e) => setMostrarAgotadas(e.target.checked)}
              />
              {" Mostrar planchas agotadas"}
            </label>
          </div>
          <div className="max-w-full overflow-x-auto">
              <div className="table-container" style={{ maxHeight: '680px', minHeight: '680px', overflowY: 'auto' }}>
                <table className="w-full table-fixed">
                  <thead className="text-center bg-primary">
                    <tr>
                      <th className={TdStyle.ThStyle}>Bodega</th>
                      <th className={TdStyle.ThStyle}>COD</th>
                      <th className={TdStyle.ThStyle}>Alto</th>
                      <th className={TdStyle.ThStyle}>Ancho</th>
                      <th className={TdStyle.ThStyle}>D1A</th>
                      <th className={TdStyle.ThStyle}>D1B</th>
                      <th className={TdStyle.ThStyle}>D2A</th>
                      <th className={TdStyle.ThStyle}>D2B</th>
                      <th className={TdStyle.ThStyle}>D3A</th>
                      <th className={TdStyle.ThStyle}>D3B</th>
                      <th className={TdStyle.ThStyle}>Total m<sup>2</sup></th>
                      <th className={TdStyle.ThStyle}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
        {currentPlanchas().map(({ id, nombre, alto, ancho, despunte1A, despunte1B, despunte2A, despunte2B, despunte3A, despunte3B }) => (
          <tr key={id}>
                        <td className={TdStyle.TdStyle}>{bodegaSeleccionada}</td>
                        <td className={TdStyle.TdStyle2}>{nombre}</td>
                        <td className={TdStyle.TdStyle}>{alto}</td>
                        <td className={TdStyle.TdStyle}>{ancho}</td>
                        <td className={TdStyle.TdStyle}>{despunte1A}</td>
                        <td className={TdStyle.TdStyle}>{despunte1B}</td>
                        <td className={TdStyle.TdStyle}>{despunte2A}</td>
                        <td className={TdStyle.TdStyle}>{despunte2B}</td>
                        <td className={TdStyle.TdStyle}>{despunte3A}</td>
                        <td className={TdStyle.TdStyle}>{despunte3B}</td>
                        <td className={TdStyle.TdStyle}>
                          {(alto*ancho - (despunte1A * despunte1B) - (despunte2A * despunte2B) - (despunte3A * despunte3B)).toFixed(2)}
                        </td>
                        <td className={TdStyle.TdStyle2}>
                          <a href="/#" className={TdStyle.TdButton}>
                            Ver Historial
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 py-2 flex flex-col justify-between items-center space-y-4">
          <div className="flex justify-center flex-grow">
            <button className="rounded-md bg-primary px-7 py-3 text-base font-medium text-white hover:bg-primary/90 mx-2" onClick={prevPage}>Anterior</button>
            <button className="rounded-md bg-primary px-7 py-3 text-base font-medium text-white hover:bg-primary/90 mx-2" onClick={nextPage}>Siguiente</button>
          </div>
          <div className="text-xl">
            Página {currentPage + 1} de {maxPage}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TablePlanchas;