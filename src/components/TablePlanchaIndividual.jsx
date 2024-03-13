import React, { useState } from "react";
import usePlanchaFromId from "../hooks/usePlanchaFromId";
import ComboBox from "./ComboBox";
import useCambiarBodega from "../hooks/useCambiarBodega";
import useAgregarMovimiento from "../hooks/useAgregarMovimiento";
import ConfirmationModal from "./ConfirmationModal";

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
  const { plancha } = usePlanchaFromId(planchaSeleccionada);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const { hacerCambioBodega } = useCambiarBodega();
  const { enviarMovimiento } = useAgregarMovimiento();

  const handleOpenConfirmation = () => {
    if (
      planchaSeleccionada === "" ||
      bodegaSeleccionada === "" ||
      bodegaDestinoSeleccionada === "" 
    ) {
      alert("Por favor, complete todos los campos antes de guardar.");
      return;
    }
    setConfirmationModalOpen(true);
  };

  const handleCloseConfirmation = () => {
    setConfirmationModalOpen(false);
  };

  const handleConfirm = async () => {
    await handleCambiar();
    setConfirmationModalOpen(false);
  };

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
    } = plancha;

    const m2Usados = (
      alto * ancho -
      despunte1A * despunte1B -
      despunte2A * despunte2B -
      despunte3A * despunte3B
    ).toFixed(2);
    const datosMovimiento = {
      valorRegistro: `${m2Usados}`,
      planchaId: planchaSeleccionada,
      nFactura: "000-000-000000000",
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
                    <th className={TdStyle.ThStyle}>
                      Total m<sup>2</sup>
                    </th>
                  </tr>
                </thead>
                <tbody>
  <tr key={plancha.id}>
    <td className={TdStyle.TdStyle}>{plancha.nombre}</td>
    <td className={TdStyle.TdStyle}>{plancha.alto}</td>
    <td className={TdStyle.TdStyle}>{plancha.ancho}</td>
    <td className={TdStyle.TdStyle}>{plancha.despunte1A}</td>
    <td className={TdStyle.TdStyle}>{plancha.despunte1B}</td>
    <td className={TdStyle.TdStyle}>{plancha.despunte2A}</td>
    <td className={TdStyle.TdStyle}>{plancha.despunte2B}</td>
    <td className={TdStyle.TdStyle}>{plancha.despunte3A}</td>
    <td className={TdStyle.TdStyle}>{plancha.despunte3B}</td>
    <td className={TdStyle.TdStyle}>
      {(
        plancha.alto * plancha.ancho -
        plancha.despunte1A * plancha.despunte1B -
        plancha.despunte2A * plancha.despunte2B -
        plancha.despunte3A * plancha.despunte3B
      ).toFixed(2)}
    </td>
  </tr>
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
            onClick={handleOpenConfirmation}
          >
            Cambiar
          </button>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirm}
        header={"Confirmación de cambio de bodega"}
        message={"¿Estás seguro de que deseas cambiar de bodega?"}
      />
    </section>
  );
};

export default TablePlanchaIndividual;
