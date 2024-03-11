import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ConfirmationModal from "./ConfirmationModal";
import useActualizarPlancha from "../hooks/useActualizarPlancha";
import useAgregarMovimiento from "../hooks/useAgregarMovimiento";
import useGastarPlancha from "../hooks/useGastarPlancha";

const TdStyle = {
  
  ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-bold text-white lg:py-7 lg:px-4`,
  TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium`,
  TdStyle2: `text-dark border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-base font-medium`,
  TdButton: `inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium`,
  InputSmall: `w-full max-w-xs px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-center`,
};

const TableModal = ({ isOpen, onClose, planchaSeleccionada, plancha }) => {
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [planchaTerminada, setPlanchaTerminada] = useState(false);
  const [values, setValues] = useState({
    factura: "000-000-000000000",
    precioVenta: "",
    m2Usados: "",
    COD: "",
    alto: "",
    ancho: "",
    D1A: "",
    D1B: "",
    D2A: "",
    D2B: "",
    D3A: "",
    D3B: "",
  });


  useEffect(() => {
    if (plancha) {
      setValues({
        ...values,
        factura: "000-000-000000000",
        COD: plancha.nombre || "",
        alto: plancha.alto || "",
        ancho: plancha.ancho || "",
        D1A: plancha.despunte1A || "",
        D1B: plancha.despunte1B || "",
        D2A: plancha.despunte2A || "",
        D2B: plancha.despunte2B || "",
        D3A: plancha.despunte3A || "",
        D3B: plancha.despunte3B || "",
      });
    }
  }, [plancha]);

  const { enviarPlanchaActualizada } = useActualizarPlancha();
  const { enviarMovimiento } = useAgregarMovimiento();
  const { gastarPlanchaPorId } = useGastarPlancha();

  const handleOpenConfirmation = () => {
    setConfirmationModalOpen(true);
  };

  const handleCloseConfirmation = () => {
    setConfirmationModalOpen(false);
  };

  const handleConfirm = async () => {
    setConfirmationModalOpen(false);
    setValues({
      factura: "",
      precioVenta: "",
      m2Usados: "",
      COD: "",
      alto: "",
      ancho: "",
      D1A: "",
      D1B: "",
      D2A: "",
      D2B: "",
      D3A: "",
      D3B: "",
    });
    if (!planchaTerminada) {
      handleSave();
    } else {
      handleSaveMovimiento();
    }
  };

  const handleSaveMovimiento = async () => {
    const { precioVenta, factura, m2Usados } = values;
    if (!factura || !precioVenta || !m2Usados) {
      alert("Por favor, complete todos los campos antes de guardar.");
      return;
    }

    const datosMovimiento = {
      valorRegistro: `${m2Usados}`,
      planchaId: planchaSeleccionada,
      nFactura: factura,
      precioVenta: precioVenta,
      tipo: "Salida",
    };

    try {
      await enviarMovimiento(datosMovimiento);
      onClose();
    } catch (error) {
      alert("Hubo un error al guardar el movimiento.");
      console.error(error);
    }

    await gastarPlanchaPorId(planchaSeleccionada);
  };

  const handleInputChange = (e, field) => {
    let value = e.target.value;
  
    if (field === "factura") {
      let cursorPosition = document.activeElement.selectionStart; // Captura la posición actual del cursor antes de cambiar el valor.
  
      // Extraer solo dígitos y reinsertar guiones en las posiciones adecuadas.
      let digits = value.replace(/\D/g, '');
      if (digits.length > 15) digits = digits.substring(0, 15); // Asegurar la longitud máxima de dígitos.
      value = `${digits.substring(0, 3)}-${digits.substring(3, 6)}-${digits.substring(6)}`.padEnd(15, "0");
  
      const regexFactura = /^\d{3}-\d{3}-\d{9}$/;
      if (!regexFactura.test(value)) return; // Si no coincide con el formato, no actualizar.
  
      // Actualizar el valor en el estado.
      setValues({ ...values, [field]: value });
  
      setTimeout(() => {
        let element = document.activeElement;
        element.setSelectionRange(cursorPosition, cursorPosition);
      }, 1);
    } else {
      // La lógica para otros campos permanece igual.
      const numericFields = ["alto", "ancho", "D1A", "D1B", "D2A", "D2B", "D3A", "D3B"];
      if (numericFields.includes(field)) {
        const regexNumeric = /^(\d{0,2})(\.\d{0,2})?$/;
        if (!regexNumeric.test(value)) return; // Si no cumple con el formato numérico deseado, no actualizar.
      }
  
      setValues({ ...values, [field]: value });
    }
  };

  const handleSave = async () => {
    const {
      precioVenta,
      m2Usados,
      factura,
      COD,
      alto,
      ancho,
      D1A,
      D1B,
      D2A,
      D2B,
      D3A,
      D3B,
    } = values;
    if (
      !precioVenta ||
      !factura ||
      !COD ||
      !alto ||
      !ancho ||
      !D1A ||
      !D1B ||
      !D2A ||
      !D2B ||
      !D3A ||
      !D3B
    ) {
      alert("Por favor, complete todos los campos antes de guardar.");
      return;
    }

    const datosMovimiento = {
      valorRegistro: `${m2Usados}`,
      planchaId: planchaSeleccionada,
      nFactura: factura,
      precioVenta: precioVenta,
      tipo: "Salida",
    };
    try {
      await enviarMovimiento(datosMovimiento);
    } catch (error) {
      alert("Hubo un error al guardar el movimiento.");
      console.error(error);
    }

    const datosPlancha = {
      nombre: COD,
      alto,
      ancho,
      despunte1A: D1A,
      despunte1B: D1B,
      despunte2A: D2A,
      despunte2B: D2B,
      despunte3A: D3A,
      despunte3B: D3B,
    };

    try {
      await enviarPlanchaActualizada(planchaSeleccionada, datosPlancha);
      onClose();
    } catch (error) {
      alert("Hubo un error al guardar la plancha.");
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="max-w-full overflow-x-auto">
            <p className="font-bold text-xl mt-10 text-center md:w-1/2 lg:w-1/2 mx-auto pb-10">
              Ahora la plancha {plancha.nombre} quedó con:
            </p>
            <div className="flex justify-between items-center mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={planchaTerminada}
                  onChange={(e) => setPlanchaTerminada(e.target.checked)}
                  className="mr-2"
                />
                Marcar plancha como terminada
              </label>
            </div>
            <table className="w-full table-fixed">
              <thead className="text-center bg-primary">
                <tr>
                  <th className={`${TdStyle.ThStyle} w-[25%]`}>Factura</th>
                  <th className={TdStyle.ThStyle}>Precio Venta</th>
                  <th className={TdStyle.ThStyle}>
                    m<sup>2</sup> Usados
                  </th>
                  <th className={TdStyle.ThStyle}>COD</th>
                  <th className={TdStyle.ThStyle}>Alto</th>
                  <th className={TdStyle.ThStyle}>Ancho</th>
                  <th className={TdStyle.ThStyle}>D1A</th>
                  <th className={TdStyle.ThStyle}>D1B</th>
                  <th className={TdStyle.ThStyle}>D2A</th>
                  <th className={TdStyle.ThStyle}>D2B</th>
                  <th className={TdStyle.ThStyle}>D3A</th>
                  <th className={TdStyle.ThStyle}>D3B</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {Object.keys(values).map((key) => (
                    <td key={key} className={TdStyle.TdStyle}>
                      <input
                        className={TdStyle.InputSmall}
                        type="text"
                        name={key}
                        value={values[key]}
                        onChange={(e) => handleInputChange(e, key)}
                        disabled={
                          planchaTerminada &&
                          key !== "factura" &&
                          key !== "precioVenta" &&
                          key !== "m2Usados"
                        }
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white mx-5 py-2 px-4 rounded"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white mx-5 py-2 px-4 rounded"
              onClick={handleOpenConfirmation}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirm}
        header={"Confirmación de salida"}
        message={
          "¿Estás seguro de que deseas modificar los datos de la plancha?"
        }
      />
    </>,
    document.getElementById("modal-root")
  );
};
export default TableModal;
