import React, { useState } from "react";
import usePlanchaFromId from "../hooks/usePlanchaFromId";
import ComboBox from "./ComboBox";
import useCambiarBodega from "../hooks/useCambiarBodega";
import useAgregarMovimiento from "../hooks/useAgregarMovimiento";

const TdStyle = {
  ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-bold text-white lg:py-7 lg:px-4`,
  TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium`,
  TdStyle2: `text-dark border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-base font-medium`,
  TdButton: `inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium`,
  InputSmall: `w-full max-w-xs px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-center`,
};

const TablePlanchaIndividual = ({
  planchaSeleccionada,
  bodegaSeleccionada,
  opcionesBodegas,
}) => {
  const [bodegaDestinoSeleccionada, setBodegaSeleccionada] = useState("");
  const { planchas } = usePlanchaFromId(planchaSeleccionada);
  const [factura, setFactura] = useState("");

  const { hacerCambioBodega } = useCambiarBodega();
  const { enviarMovimiento } = useAgregarMovimiento();

  const handleCambiar = async () => {
    const {
      alto,
      ancho,
      despunte1A,
      despunte1B,
      despunte2A,
      despunte2B,
      despunte3A,
      despunte3B,
    } = planchas[0];
    if (
      planchaSeleccionada === "" ||
      bodegaSeleccionada === "" ||
      bodegaDestinoSeleccionada === ""
    ) {
      alert("Por favor, complete todos los campos antes de guardar.");
      return;
    }

    const m2Usados = (
      alto * ancho -
      despunte1A * despunte1B -
      despunte2A * despunte2B -
      despunte3A * despunte3B
    ).toFixed(2);
    const datosMovimiento = {
      valorRegistro: `${m2Usados}`,
      planchaId: planchaSeleccionada,
      nFactura: factura,
      precioVenta: 0,
      tipo: "CambioBodega",
    };
    try {
      await enviarMovimiento(datosMovimiento);
    } catch (error) {
      alert("Hubo un error al hacer el movimiento.");
      console.error(error);
    }

    try {
      await hacerCambioBodega(planchaSeleccionada, bodegaDestinoSeleccionada);
    } catch (error) {
      alert("Hubo un error al hacer el cambio la plancha.");
      console.error(error);
    }
  };

  const handleBodegaDestinoSelect = (selectedOption) => {
    setBodegaSeleccionada(selectedOption ? selectedOption.value : "");
  };

  const handleFacturaChange = (e) => {
    setFactura(e.target.value);
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
                    <th className={TdStyle.ThStyle}>Factura</th>
                    <th className={TdStyle.ThStyle}>COD</th>
                    <th className={TdStyle.ThStyle}>Alto</th>
                    <th className={TdStyle.ThStyle}>Ancho</th>
                    <th className={TdStyle.ThStyle}>D1A</th>
                    <th className={TdStyle.ThStyle}>D2A</th>
                    <th className={TdStyle.ThStyle}>D1B</th>
                    <th className={TdStyle.ThStyle}>D2B</th>
                    <th className={TdStyle.ThStyle}>D3A</th>
                    <th className={TdStyle.ThStyle}>D3B</th>
                    <th className={TdStyle.ThStyle}>
                      Total m<sup>2</sup>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {planchas.map(
                    ({
                      id,
                      nombre,
                      alto,
                      ancho,
                      despunte1A,
                      despunte1B,
                      despunte2A,
                      despunte2B,
                      despunte3A,
                      despunte3B,
                    }) => (
                      <tr key={id}>
                        <td className={TdStyle.TdStyle}>
                          <input
                            type="text"
                            className={TdStyle.InputSmall}
                            value={factura}
                            onChange={handleFacturaChange}
                          />
                        </td>
                        <td className={TdStyle.TdStyle}>{nombre}</td>
                        <td className={TdStyle.TdStyle}>{alto}</td>
                        <td className={TdStyle.TdStyle}>{ancho}</td>
                        <td className={TdStyle.TdStyle}>{despunte1A}</td>
                        <td className={TdStyle.TdStyle}>{despunte1B}</td>
                        <td className={TdStyle.TdStyle}>{despunte2A}</td>
                        <td className={TdStyle.TdStyle}>{despunte2B}</td>
                        <td className={TdStyle.TdStyle}>{despunte3A}</td>
                        <td className={TdStyle.TdStyle}>{despunte3B}</td>
                        <td className={TdStyle.TdStyle}>
                          {(
                            alto * ancho -
                            despunte1A * despunte1B -
                            despunte2A * despunte2B -
                            despunte3A * despunte3B
                          ).toFixed(2)}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <ComboBox
            placeholder="Seleccione una bodega"
            value={bodegaDestinoSeleccionada}
            onChange={handleBodegaDestinoSelect}
            options={opcionesBodegas.filter(
              ({ value }) => value !== bodegaSeleccionada
            )}
            width={230}
            label={"Bodega Destino"}
          />

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mx-5 my-2 px-4 rounded w-40"
            onClick={handleCambiar}
          >
            Cambiar
          </button>
        </div>
      </div>
    </section>
  );
};

export default TablePlanchaIndividual;
