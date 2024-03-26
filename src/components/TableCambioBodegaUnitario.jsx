import React, { useState, useEffect } from "react";
import ComboBox from "./ComboBox";
import ConfirmationModal from "./ConfirmationModal";
import useAgregarMovimientoUnitario from "../hooks/useAgregarMovimientoUnitario";
import useIncrementarModeloUnitario from "../hooks/useIncrementarModeloUnitario";
import useDecrementarModeloUnitario from "../hooks/useDecrementarModeloUnitario";
import useCantidadPorBodegaIndividual from "../hooks/useCantidadPorBodegaIndividual";
import useModeloUnitarioFromId from "../hooks/useModeloUnitarioFromId";


const TdStyle = {
  ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-bold text-white lg:py-7 lg:px-4`,
  TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium`,
  TdStyle2: `text-dark border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-base font-medium`,
  TdButton: `inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium`,
  InputSmall: `w-full max-w-xs px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-center`,
};

const TableCambioBodegaUnitario = ({
  modeloSeleccionado,
  bodegaSeleccionada,
  opcionesBodegas,
}) => {
  const [cantidad, setCantidad] = useState(0);
  const [bodegaDestinoSeleccionada, setBodegaSeleccionada] = useState("");
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const { incrementarUnitario } = useIncrementarModeloUnitario();
  const { enviarMovimientoUnitario } = useAgregarMovimientoUnitario();
  const { decrementarUnitario } = useDecrementarModeloUnitario();
  const { cantidades } = useCantidadPorBodegaIndividual(modeloSeleccionado, bodegaSeleccionada);
  const { modelo } = useModeloUnitarioFromId(modeloSeleccionado);

  useEffect(() => {
    if (cantidades) {
      setCantidad(cantidades.cantidad);
    }
  }, [cantidades]);

  const handleOpenConfirmation = () => {
    if (
      modeloSeleccionado === "" ||
      bodegaSeleccionada === "" ||
      bodegaDestinoSeleccionada === "" ||
      cantidad === 0
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
    try {
        await decrementarUnitario(modeloSeleccionado, bodegaSeleccionada, cantidad);
        await incrementarUnitario(modeloSeleccionado, bodegaDestinoSeleccionada, cantidad);
        const totalm2 = cantidad * modelo.m2PorUnidad;
        const datosMovimiento = {
            tipo: "CambioBodega",
            cantidadCambiada: cantidad,
            nFactura: "000-000-000000000",
            precioVenta: 0,
            modelounitarioId: modeloSeleccionado,
            valorRegistro: totalm2,
          };
        console.log(datosMovimiento);
        await enviarMovimientoUnitario(datosMovimiento);
      } catch (error) {
        alert("Hubo un error al guardar el movimiento.");
        console.error(error);
      }
    };

  const handleBodegaDestinoSelect = (selectedOption) => {
    setBodegaSeleccionada(selectedOption ? selectedOption.value : "");
  };

  const handleCantidadChange = (event) => {
    setCantidad(event.target.value); // Permite editar el valor
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
                    <th className={TdStyle.ThStyle}>Bodega</th>
                    <th className={TdStyle.ThStyle}>Modelo</th>
                    <th className={TdStyle.ThStyle}>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
  <tr key={cantidades.nombre}>
    <td className={TdStyle.TdStyle}>{cantidades.nombre}</td>
    <td className={TdStyle.TdStyle}>{modelo.nombre}</td>
    <td className={TdStyle.TdStyle}>
                        <input
                          type="number"
                          className={TdStyle.InputSmall}
                          value={cantidad}
                          onChange={handleCantidadChange}
                        />
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

export default TableCambioBodegaUnitario;
