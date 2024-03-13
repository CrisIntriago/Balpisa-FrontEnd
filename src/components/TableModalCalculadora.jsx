import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import usePlanchaFromId from "../hooks/usePlanchaFromId";
const TdStyle = {
  
  ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-bold text-white lg:py-7 lg:px-4`,
  TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium`,
  TdStyle2: `text-dark border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-base font-medium`,
  TdButton: `inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium`,
  InputSmall: `w-full max-w-xs px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-center`,
};

const TableModalCalculadora = ({ isOpen, onClose, planchaSeleccionada }) => {
    const { plancha } = usePlanchaFromId(planchaSeleccionada);
    const [editableData, setEditableData] = useState({});
    const [total, setTotal] = useState(0);
    const [precio, setPrecio] = useState(0);
  
    useEffect(() => {
      setEditableData({ ...plancha });
      if (plancha) {
        calculateTotals(plancha);
      }
    }, [plancha, planchaSeleccionada]);
  
    const handleInputChange = (event, key) => {
      const value = event.target.value;
      setEditableData(currentData => ({
        ...currentData,
        [key]: value,
      }));
    };
  
    const calculateTotals = (data) => {
      let tempTotal = 0;
      let tempPrecio = 0;
      const { alto, ancho, despunte1A, despunte1B, despunte2A, despunte2B, despunte3A, despunte3B, preciom2 } = data;
      const num = alto * ancho - (despunte1A * despunte1B) - (despunte2A * despunte2B) - (despunte3A * despunte3B);
      tempTotal += num;
      tempPrecio += num * preciom2;
  
      setTotal(tempTotal.toFixed(2));
      setPrecio(tempPrecio.toFixed(2));
    };
  
    const handleCalculateClick = () => {
      calculateTotals(editableData);
    };
  
    if (!isOpen) return null;
  
    return ReactDOM.createPortal(
      <>
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
          <section className="bg-gray-100 py-20 lg:py-[50px] w-full">
            <div className="container mx-auto">
              <div className="flex flex-wrap -mx-4">
                <div className="w-full">
                  <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-fixed">
                      <thead className="text-center bg-primary">
                        <tr>
                          <th className={TdStyle.ThStyle}>Nombre</th>
                          <th className={TdStyle.ThStyle}>Alto</th>
                          <th className={TdStyle.ThStyle}>Ancho</th>
                          <th className={TdStyle.ThStyle}>D1A</th>
                          <th className={TdStyle.ThStyle}>D1B</th>
                          <th className={TdStyle.ThStyle}>D2A</th>
                          <th className={TdStyle.ThStyle}>D2B</th>
                          <th className={TdStyle.ThStyle}>D3A</th>
                          <th className={TdStyle.ThStyle}>D3B</th>
                          <th className={TdStyle.ThStyle}>Total m<sup>2</sup></th>
                          <th className={TdStyle.ThStyle}>Precio</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className={TdStyle.TdStyle}>{editableData.nombre}</td>
                          <td className={TdStyle.TdStyle}>
                            <input
                              className={TdStyle.InputSmall}
                              type="number"
                              step="0.01"
                              value={editableData.alto || ''}
                              onChange={(e) => handleInputChange(e, 'alto')}
                            />
                          </td>
                          <td className={TdStyle.TdStyle}>
  <input
    className={TdStyle.InputSmall}
    type="number"
    step="0.01"
    value={editableData.ancho || ''}
    onChange={(e) => handleInputChange(e, 'ancho')}
  />
</td>
<td className={TdStyle.TdStyle}>
  <input
    className={TdStyle.InputSmall}
    type="number"
    step="0.01"
    value={editableData.despunte1A || ''}
    onChange={(e) => handleInputChange(e, 'despunte1A')}
  />
</td>
<td className={TdStyle.TdStyle}>
  <input
    className={TdStyle.InputSmall}
    type="number"
    step="0.01"
    value={editableData.despunte1B || ''}
    onChange={(e) => handleInputChange(e, 'despunte1B')}
  />
</td>
<td className={TdStyle.TdStyle}>
  <input
    className={TdStyle.InputSmall}
    type="number"
    step="0.01"
    value={editableData.despunte2A || ''}
    onChange={(e) => handleInputChange(e, 'despunte2A')}
  />
</td>
<td className={TdStyle.TdStyle}>
  <input
    className={TdStyle.InputSmall}
    type="number"
    step="0.01"
    value={editableData.despunte2B || ''}
    onChange={(e) => handleInputChange(e, 'despunte2B')}
  />
</td>
<td className={TdStyle.TdStyle}>
  <input
    className={TdStyle.InputSmall}
    type="number"
    step="0.01"
    value={editableData.despunte3A || ''}
    onChange={(e) => handleInputChange(e, 'despunte3A')}
  />
</td>
<td className={TdStyle.TdStyle}>
  <input
    className={TdStyle.InputSmall}
    type="number"
    step="0.01"
    value={editableData.despunte3B || ''}
    onChange={(e) => handleInputChange(e, 'despunte3B')}
  />
</td>
<td className={TdStyle.TdStyle}>
  {total}
</td>
<td className={TdStyle.TdStyle}>
  {precio}
</td>
                        </tr>
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
                  onClick={onClose}>
                  Salir
                </button>
              </div>
            </div>
          </section>
        </div>
      </>,
      document.getElementById("modal-root")
    );
  };
  
  export default TableModalCalculadora;