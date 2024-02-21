import React, { useState, useEffect } from "react";
import Loading from "./Loading";

const TdStyle = {
  ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-bold text-white lg:py-7 lg:px-4`,
  TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium`,
  TdStyle2: `text-dark border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-base font-medium`,
  TdButton: `inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium`,
}

const Table = ({familiaSeleccionada, modeloSeleccionado, arreglo}) => {

  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    setCurrentPage(0)
  }, [familiaSeleccionada, modeloSeleccionado])


  const filteredElements = () => {
    if(familiaSeleccionada === '' && modeloSeleccionado === ''){
      return arreglo.slice(currentPage, currentPage + 5)
    } else if(familiaSeleccionada !== '' && modeloSeleccionado === ''){
      return arreglo.filter( elemento => elemento.id === familiaSeleccionada).slice(currentPage, currentPage + 5)
    }
    const filtered = arreglo.filter( elemento => elemento.idmodelo === modeloSeleccionado)
    return filtered.slice(currentPage, currentPage + 5)
  }

  const nextPage = () => {
    const totalItems = arreglo.length;
    const maxPage = Math.ceil(totalItems / 5);
    const nextPage = (currentPage + 1) % maxPage; 
    setCurrentPage(nextPage);
  };
  
  const prevPage = () => {
    const totalItems = arreglo.length;
    const maxPage = Math.ceil(totalItems / 5);
    const prevPage = (currentPage - 1 + maxPage) % maxPage;
    setCurrentPage(prevPage);
  };

  return (
    <section className="bg-gray-100 py-20 lg:py-[50px] w-full">
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full">
            <div className="max-w-full overflow-x-auto">
              <div className="table-container" style={{ maxHeight: '520px', overflowY: 'auto' }}>
                <table className="w-full table-fixed">
                  <thead className="text-center bg-primary">
                    <tr>
                      <th className={TdStyle.ThStyle}>Modelo</th>
                      <th className={TdStyle.ThStyle}>
                        m<sup>2</sup> Disponibles
                      </th>
                      <th className={TdStyle.ThStyle}>Precio/m<sup>2</sup></th>
                      <th className={TdStyle.ThStyle}>Precio/m<sup>2</sup></th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredElements().map(({ postId, id, name, email }) => (
                      <tr key={id}>
                        <td className={TdStyle.TdStyle}>{postId}</td>
                        <td className={TdStyle.TdStyle2}>{name}</td>
                        <td className={TdStyle.TdStyle}>{email}</td>
                        <td className={TdStyle.TdStyle2}>
                          <a href="/#" className={TdStyle.TdButton}>
                            Ver Planchas
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {<Loading />}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button className="rounded-md bg-primary px-7 py-3 text-base font-medium text-white hover:bg-primary/90 mx-2"
          onClick={prevPage}
          >
            Anterior
          </button>
          <button className="rounded-md bg-primary px-7 py-3 text-base font-medium text-white hover:bg-primary/90 mx-2"
          onClick={nextPage}>
            Siguiente
          </button>
        </div>
      </div>
    </section>
  );
};

export default Table;