import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import TableModal from "./TableModal";
import usePlanchaFromId from "../hooks/usePlanchaFromId";

const TdStyle = {
  ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-bold text-white lg:py-7 lg:px-4`,
  TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium`,
  TdStyle2: `text-dark border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-base font-medium`,
  TdButton: `inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium`,
  InputSmall: `w-full max-w-xs px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-center`
};

const TableSalida = ({ planchaSeleccionada }) => {
  const { planchas } = usePlanchaFromId(planchaSeleccionada);
  const [editableData, setEditableData] = useState([]);
  const [isTableModalOpen, setTableModalOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [precio, setPrecio] = useState(0);

  useEffect(() => {
    const data = planchas.map(plancha => ({ ...plancha }));
    setEditableData(data);
    calculateTotals(data); 
  }, [planchas, planchaSeleccionada]);

  const handleVenderClick = () => {
    setTableModalOpen(true);
  };

  const handleClose = () => {
    setTableModalOpen(false);
  };

  const handleInputChange = (event, nombre, key) => {
    const value = event.target.value;
    setEditableData(currentData =>
      currentData.map(data => {
        if (data.nombre === nombre) {
          return { ...data, [key]: value };
        }
        return data;
      })
    );
  };

  const calculateTotals = (data) => {
    let tempTotal = 0;
    let tempPrecio = 0;
    data.forEach(({ alto, ancho, despunte1A, despunte1B, despunte2A, despunte2B, despunte3A, despunte3B, preciom2 }) => {
      const num = alto * ancho - (despunte1A * despunte1B) - (despunte2A * despunte2B) - (despunte3A * despunte3B);
      tempTotal += num;
      tempPrecio += num * preciom2;
    });
    setTotal(tempTotal.toFixed(2));
    setPrecio(tempPrecio.toFixed(2));
  };


  const handleCalculateClick = () => {
    calculateTotals(editableData);
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
                    <th className={TdStyle.ThStyle}>COD</th>
                    <th className={TdStyle.ThStyle}>Alto</th>
                    <th className={TdStyle.ThStyle}>Ancho</th>
                    <th className={TdStyle.ThStyle}>D1A</th>
                    <th className={TdStyle.ThStyle}>D2A</th>
                    <th className={TdStyle.ThStyle}>D1B</th>
                    <th className={TdStyle.ThStyle}>D2B</th>
                    <th className={TdStyle.ThStyle}>D3A</th>
                    <th className={TdStyle.ThStyle}>D3B</th>
                    <th className={TdStyle.ThStyle}>Total m<sup>2</sup></th>
                    <th className={TdStyle.ThStyle}>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {editableData.map(({ id, nombre, alto, ancho, despunte1A, despunte1B, despunte2A, despunte2B, despunte3A, despunte3B }) => (
                    <tr key={id}>
                      <td className={TdStyle.TdStyle}>{nombre}</td>
                      <td className={TdStyle.TdStyle}>
                        <input className={TdStyle.InputSmall} type="number" step="0.01" max="9.99" min="0.00" value={alto} onChange={(e) => handleInputChange(e, nombre, 'alto')} />
                      </td>
                      <td className={TdStyle.TdStyle}>
                        <input className={TdStyle.InputSmall} type="number" step="0.01" max="9.99" min="0.00" value={ancho} onChange={(e) => handleInputChange(e, nombre, 'ancho')} />
                      </td>
                      <td className={TdStyle.TdStyle}>
                        <input className={TdStyle.InputSmall} type="number" step="0.01" max="9.99" min="0.00" value={despunte1A} onChange={(e) => handleInputChange(e, nombre, 'despunte1A')} />
                      </td>
                      <td className={TdStyle.TdStyle}>
                        <input className={TdStyle.InputSmall} type="number" step="0.01" max="9.99" min="0.00" value={despunte1B} onChange={(e) => handleInputChange(e, nombre, 'despunte1B')} />
                      </td>
                      <td className={TdStyle.TdStyle}>
                        <input className={TdStyle.InputSmall} type="number" step="0.01" max="9.99" min="0.00" value={despunte2A} onChange={(e) => handleInputChange(e, nombre, 'despunte2A')} />
                      </td>
                      <td className={TdStyle.TdStyle}>
                        <input className={TdStyle.InputSmall} type="number" step="0.01" max="9.99" min="0.00" value={despunte2B} onChange={(e) => handleInputChange(e, nombre, 'despunte2B')} />
                      </td>
                      <td className={TdStyle.TdStyle}>
                        <input className={TdStyle.InputSmall} type="number" step="0.01" max="9.99" min="0.00" value={despunte3A} onChange={(e) => handleInputChange(e, nombre, 'despunte3A')} />
                      </td>
                      <td className={TdStyle.TdStyle}>
                        <input className={TdStyle.InputSmall} type="number" step="0.01" max="9.99" min="0.00" value={despunte3B} onChange={(e) => handleInputChange(e, nombre, 'despunte3B')} />
                      </td>
                      <td className={TdStyle.TdStyle}>{total}</td>
                      <td className={TdStyle.TdStyle}>{precio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
          <div className="flex justify-center mt-4">
            <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mx-5 my-2 px-4 rounded w-40" 
            onClick={handleCalculateClick}>
              Calcular
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mx-5 my-2 px-4 rounded w-40"
              onClick={handleVenderClick}>
              Modificar Plancha
            </button>
          </div>


        <TableModal isOpen={isTableModalOpen} onClose={handleClose} planchaSeleccionada={planchaSeleccionada} plancha={planchas[0]}/>
      </div>
    </section>

  );
};

export default TableSalida;