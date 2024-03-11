import React, { useEffect, useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import useIncrementarModeloUnitario from "../hooks/useIncrementarModeloUnitario";
import useAgregarMovimientoUnitario from "../hooks/useAgregarMovimientoUnitario";
import useModeloUnitarioFromId from "../hooks/useModeloUnitarioFromId";

const TdStyle = {
  ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-bold text-white lg:py-7 lg:px-4`,
  TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium`,
  InputSmall: `w-full max-w-xs px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-center`,
};

const TableIngresoUnitario = ({ modeloSeleccionado }) => {

  const initialStateUnitario = {
    factura: "000-000-000000000",
    cantidad: "",
  }

  const [nombre, setNombre] = useState('');

  
  const [values, setValues] = useState(initialStateUnitario);
  
  const { incrementarUnitario } = useIncrementarModeloUnitario();
  const { enviarMovimientoUnitario } = useAgregarMovimientoUnitario();
  const { modelo } = useModeloUnitarioFromId(modeloSeleccionado);


  useEffect (() => {
    setNombre(modelo.nombre)
  }, [modelo])

  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const handleOpenConfirmation = () => {
    setConfirmationModalOpen(true);
  };

  const handleCloseConfirmation = () => {
    setConfirmationModalOpen(false);
  };

  const handleConfirm = async () => {
    await handleSave();
    setConfirmationModalOpen(false);
    setValues({...initialStateUnitario});
  };

  const handleInputChange = (e, field) => {
    let value = e.target.value;

    if (field === "factura") {
      let cursorPosition = e.target.selectionStart;
      let digits = value.replace(/\D/g, "");
      if (digits.length > 15) digits = digits.substring(0, 15);
      value = `${digits.substring(0, 3)}-${digits.substring(3, 6)}-${digits.substring(6)}`.padEnd(15, "0");

      setTimeout(() => {
        let element = e.target;
        element.setSelectionRange(cursorPosition, cursorPosition);
      }, 1);
    } else if (field === "cantidad") {
      value = value.replace(",", ".");

      // Permitir solo valores numéricos y decimales
      if (/^\d*\.?\d*$/.test(value) || value === "") {
        value = value === "" ? "" : value; // Mantener como cadena para consistencia en el manejo del estado
      } else {
        return; // No actualizar si no cumple la condición
      }
    }

    setValues({ ...values, [field]: value });
  };

  const handleSave = async () => {
    const { factura, cantidad } = values;
    if (
      factura === "" ||
      cantidad === ""
    ) {
      alert("Por favor, complete todos los campos antes de guardar.");
      return;
    }

    try {
      await incrementarUnitario(modeloSeleccionado, cantidad);
      const totalm2 = cantidad * modelo.m2PorUnidad
      const datosMovimiento = {
        tipo: "Ingreso",
        cantidadCambiada: cantidad,
        nFactura: factura,
        precioVenta: 0,
        modelounitarioId: modeloSeleccionado,
        valorRegistro: totalm2,
      };

      await enviarMovimientoUnitario(datosMovimiento);
    } catch (error) {
      alert("Hubo un error al guardar la plancha o el movimiento.");
      console.error(error);
    }
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
                    <th className={TdStyle.ThStyle}>Nombre</th>
                    <th className={TdStyle.ThStyle}>Factura</th>
                    <th className={TdStyle.ThStyle}>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={TdStyle.TdStyle}>{nombre}</td>
                    {Object.keys(values).map((key) => (
                      <td key={key} className={TdStyle.TdStyle}>
                        <input
                          className={TdStyle.InputSmall}
                          type="text"
                          value={values[key]}
                          onChange={(e) => handleInputChange(e, key)}
                        />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleOpenConfirmation}
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirm}
        header={"Confirmación de ingreso"}
        message={"¿Estás seguro de que deseas guardar el ingreso?"}
      />
    </section>
  );
};

export default TableIngresoUnitario;