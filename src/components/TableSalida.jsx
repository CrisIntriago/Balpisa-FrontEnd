import React, { useState, useEffect } from "react";
import ConfirmationModal from "./ConfirmationModal";
import useActualizarPlancha from "../hooks/useActualizarPlancha";
import useAgregarMovimiento from "../hooks/useAgregarMovimiento";
import useGastarPlancha from "../hooks/useGastarPlancha";
import usePlanchaFromId from "../hooks/usePlanchaFromId";
import TableModalCalculadora from "./TableModalCalculadora";

const TdStyle = {
  
  ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-bold text-white lg:py-7 lg:px-4`,
  TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium`,
  TdStyle2: `text-dark border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-base font-medium`,
  TdButton: `inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium`,
  InputSmall: `w-full max-w-xs px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-center disabled:bg-gray-200`,
};

const TableSalidax = ({ planchaSeleccionada }) => {
    const { plancha } = usePlanchaFromId(planchaSeleccionada);
    const [isTableModalOpen, setTableModalOpen] = useState(false);
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
  
    const handleAbrirCalculadora = () => {
        setTableModalOpen(true);
    }
    const handleClose = () => {
        setTableModalOpen(false);
    };

  const handleOpenConfirmation = () => {
    setConfirmationModalOpen(true);
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
    } catch (error) {
      alert("Hubo un error al guardar el movimiento.");
      console.error(error);
    }

    await gastarPlanchaPorId(planchaSeleccionada);
  };

  const handleInputChange = (e, field) => {
    let value = e.target.value;
  
    if (field === "factura") {
      let cursorPosition = e.target.selectionStart; // Captura la posición del cursor.
      let originalLength = value.length;
  
      // Filtrar solo dígitos y formatear el valor con guiones.
      let digits = value.replace(/\D/g, '');
      if (digits.length > 15) digits = digits.substring(0, 15); // Limitar a 15 dígitos.
      value = `${digits.padEnd(15, '0').substring(0, 3)}-${digits.padEnd(15, '0').substring(3, 6)}-${digits.padEnd(15, '0').substring(6)}`;
  
      // Si se presionó backspace y el cursor está en una posición donde debería haber un dígito,
      // reemplazar el dígito en esa posición por 0 y ajustar la posición del cursor si es necesario.
      if (e.inputType === "deleteContentBackward") {
        // Calcula la nueva posición del cursor ajustando por la eliminación de caracteres no numéricos.
        if (cursorPosition === 4 || cursorPosition === 8) cursorPosition -= 1;
        
        let adjustedCursorPosition = cursorPosition <= 4 ? 0 : cursorPosition <= 8 ? 3 : 6;
        adjustedCursorPosition += cursorPosition - (cursorPosition > 8 ? 2 : cursorPosition > 4 ? 1 : 0);
        
        // Construye el nuevo valor con el dígito reemplazado por un 0.
        digits = digits.padEnd(15, '0').split('');
        digits[adjustedCursorPosition] = '0';
        value = `${digits.join('').substring(0, 3)}-${digits.join('').substring(3, 6)}-${digits.join('').substring(6)}`;
  
        // Ajusta la posición del cursor para manejar casos especiales cerca de los guiones.
        if (originalLength > value.length) cursorPosition -= 1;
      }
  
      // Verificar que el valor final cumple con el formato de factura.
      const regexFactura = /^\d{3}-\d{3}-\d{9}$/;
      if (!regexFactura.test(value)) return;
  
      // Actualización del estado.
      setValues({ ...values, [field]: value });
  
      // Ajuste de la posición del cursor después de actualizar el valor.
      setTimeout(() => {
        let element = e.target;
        element.setSelectionRange(cursorPosition, cursorPosition);
      }, 0);
    } else {
      // Validación para campos numéricos "alto", "ancho", y "despuntes".
      const numericFields = ["alto", "ancho", "D1A", "D1B", "D2A", "D2B", "D3A", "D3B"];
      if (numericFields.includes(field)) {
        const regexNumeric = /^(9\.\d{1,2}|[0-9]?\.\d{0,2}|[0-9])?$/; // Permite valores entre 0 y 9.99.
        if (!regexNumeric.test(value)) return;
      }
  
      // Actualización del estado para otros campos.
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
    } catch (error) {
      alert("Hubo un error al guardar la plancha.");
      console.error(error);
    }
  };

  return(
    <>
        <div className="bg-gray-100 px-40 pb-10">
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
                    <td key={key} className={TdStyle.TdStyle2}>
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
              onClick={handleAbrirCalculadora}
            >
              Abrir calculadora
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white mx-5 py-2 px-4 rounded"
              onClick={handleOpenConfirmation}
            >
              Hacer Salida
            </button>
          </div>
        </div>

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
        onConfirm={handleConfirm}
        header={"Confirmación de salida"}
        message={
          "¿Estás seguro de que deseas modificar los datos de la plancha?"
        }
      />
      <TableModalCalculadora isOpen={isTableModalOpen} onClose={handleClose} planchaSeleccionada={planchaSeleccionada}/>
    </>
  );
};
export default TableSalidax;
