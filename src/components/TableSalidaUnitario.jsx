import React, { useEffect, useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import useAgregarMovimientoUnitario from "../hooks/useAgregarMovimientoUnitario";
import useModeloUnitarioFromId from "../hooks/useModeloUnitarioFromId";
import useDecrementarModeloUnitario from "../hooks/useDecrementarModeloUnitario";

const TdStyle = {
  ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-bold text-white lg:py-7 lg:px-4`,
  TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium`,
  InputSmall: `w-full max-w-xs px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-center`,
};

const TableSalidaUnitario = ({ modeloSeleccionado }) => {
  const initialStateUnitario = {
    factura: "",
    cantidad: "",
    precioVenta: "",
  };

  const [nombre, setNombre] = useState('');
  const [values, setValues] = useState(initialStateUnitario);
  const [totalm2, setTotalm2] = useState(0); 

  const { decrementarUnitario } = useDecrementarModeloUnitario();
  const { enviarMovimientoUnitario } = useAgregarMovimientoUnitario();
  const { modelo } = useModeloUnitarioFromId(modeloSeleccionado);

  useEffect (() => {
    setNombre(modelo.nombre);
    const total = modelo.m2PorUnidad * parseFloat(values.cantidad || 0);
    setTotalm2(total);
    const precioVenta = total * modelo.precio;
    setValues(values => ({ ...values, precioVenta: precioVenta.toFixed(2) }));
  }, [modelo, values.cantidad]);

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
    const numericFields = [
      "cantidad",
      "precio",
    ];

    if (numericFields.includes(field)) {
      value = value.replace(",", ".");

      // Permitir solo valores numéricos y decimales
      if (/^\d*\.?\d*$/.test(value) || value === "") {
        setValues({ ...values, [field]: value });
      }
    } else {
      // Para campos no numéricos, actualizar directamente
      setValues({ ...values, [field]: value });
    }
  };

  const handleSave = async () => {
    const { factura, cantidad, precioVenta } = values;
    if (
      factura === "" ||
      cantidad === "" ||
      precioVenta === ""
    ) {
      alert("Por favor, complete todos los campos antes de guardar.");
      return;
    }

    try {
      await decrementarUnitario(modeloSeleccionado, cantidad);
      console.log(cantidad + " " +factura+" "+precioVenta +" "+ modeloSeleccionado);
      const datosMovimiento = {
        tipo: "Salida",
        cantidadCambiada: cantidad,
        nFactura: factura,
        precioVenta: precioVenta,
        modeloUnitarioId: modeloSeleccionado,
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
                    <th className={TdStyle.ThStyle}>Precio</th> 
                    <th className={TdStyle.ThStyle}>Total m<sup>2</sup></th> 
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
                    <td className={TdStyle.TdStyle}>{totalm2.toFixed(2)}</td>
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
        header={"Confirmación de salida"}
        message={"¿Estás seguro de que deseas guardar la salida?"}
      />
    </section>
  );
};

export default TableSalidaUnitario;
