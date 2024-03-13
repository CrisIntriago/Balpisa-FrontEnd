import React, { useState, useEffect, useMemo } from "react";
import Loading from "./Loading";
import useModelosCompletos from "../hooks/useModelosCompletos";

const TdStyle = {
  ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-bold text-white lg:py-7 lg:px-4`,
  TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium`,
  TdStyle2: `text-dark border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-base font-medium`,
  TdButton: `inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium`,
};

const TableIngresoModeloUnitario = ({familiaSeleccionada}) => {

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
                      <th className={TdStyle.ThStyle}>Precio/m<sup>2</sup> ($)</th>
                      <th className={TdStyle.ThStyle}>m<sup>2</sup> Disponibles</th>
                      <th className={TdStyle.ThStyle}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                          <td className={TdStyle.TdStyle}>NOMBRE UNITARIO</td>
                          <td className={TdStyle.TdStyle2}>PRECIO</td>
                          <td className={TdStyle.TdStyle}>M2DISPONIBLES</td>
                          <td className={TdStyle.TdStyle}>ACCIONES</td>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TableIngresoModeloUnitario;
