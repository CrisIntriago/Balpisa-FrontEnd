import React, { useState, useRef } from "react";
import useAgregarPlancha from "../hooks/useAgregarPlancha";
import ConfirmationModal from "./ConfirmationModal";
import useAgregarMovimiento from "../hooks/useAgregarMovimiento";

const TdStyle = {
  ThStyle: `w-1/10 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-bold text-white lg:py-7 lg:px-4`,
  TdStyle: `w-1/10 text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-1 text-center text-base font-medium`, 
  InputSmall: `w-full max-w-md px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-center`,
};


const TableIngreso = ({ modeloSeleccionado, bodegaSeleccionada }) => {
  const initialState = {
    factura: "000-000-000000000", // Valor inicial ajustado
    COD: "",
    alto: "",
    ancho: "",
    D1A: "",
    D1B: "",
    D2A: "",
    D2B: "",
    D3A: "",
    D3B: "",
  };

  const [values, setValues] = useState(initialState);
  const facturaInputRef = useRef(null);
  const { enviarPlancha } = useAgregarPlancha();
  const { enviarMovimiento } = useAgregarMovimiento();

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
    setValues({...initialState});
  };

  const handleInputChange = (e, field) => {
    let value = e.target.value.replace(",", ".");
  
    if (field === "factura") {
      let cursorPosition = e.target.selectionStart; // Captura la posición actual del cursor antes de cambiar el valor.
      let digits = value.replace(/\D/g, '');
      if (digits.length > 15) digits = digits.substring(0, 15);
      value = `${digits.substring(0, 3)}-${digits.substring(3, 6)}-${digits.substring(6)}`.padEnd(15, '0');
      
      setValues(prevValues => ({ ...prevValues, [field]: value }));
  
      // Ajustar la posición del cursor después de la actualización.
      if (facturaInputRef.current) {
        setTimeout(() => {
          facturaInputRef.current.setSelectionRange(cursorPosition, cursorPosition);
        }, 1);
      }
    } else {
      const numericFields = ["alto", "ancho", "D1A", "D1B", "D2A", "D2B", "D3A", "D3B"];
  
      if (numericFields.includes(field)) {
        // Verificar que el valor es un número entre 0 y 9.99, con hasta dos decimales.
        if ((/^\d*\.?\d{0,2}$/.test(value) && parseFloat(value) <= 9.99) || value === "") {
          setValues({ ...values, [field]: value });
        } else {
          return; // Si no cumple con las restricciones, no actualizar.
        }
      } else {
        // Para campos no numéricos o sin restricciones específicas, actualizar directamente.
        setValues({ ...values, [field]: value });
      }
    }
  };

  const handleSave = async () => {
    const { factura, COD, alto, ancho, D1A, D1B, D2A, D2B, D3A, D3B } = values;
    if (
      factura === "" ||
      COD === "" ||
      alto === "" ||
      ancho === "" ||
      D1A === "" ||
      D1B === "" ||
      D2A === "" ||
      D2B === "" ||
      D3A === "" ||
      D3B === ""
    ) {
      alert("Por favor, complete todos los campos antes de guardar.");
      return;
    }

    const datosPlancha = {
      nombre: COD,
      alto: parseFloat(alto),
      ancho: parseFloat(ancho),
      despunte1A: parseFloat(D1A),
      despunte1B: parseFloat(D1B),
      despunte2A: parseFloat(D2A),
      despunte2B: parseFloat(D2B),
      despunte3A: parseFloat(D3A),
      despunte3B: parseFloat(D3B),
      modeloId: modeloSeleccionado,
      bodegaId: bodegaSeleccionada,
    };

    try {
      const idPlancha = await enviarPlancha(datosPlancha);
      const m2Usados = (
        alto * ancho -
        D1A * D1B -
        D2A * D1B -
        D3A * D3B
      ).toFixed(2);

      const datosMovimiento = {
        valorRegistro: `${m2Usados}`,
        planchaId: idPlancha,
        nFactura: factura,
        precioVenta: 0,
        tipo: "Ingreso",
      };

      await enviarMovimiento(datosMovimiento);
    } catch (error) {
      alert("Hubo un error al guardar la plancha o el movimiento.");
      console.error(error);
    }
    alert('El movimiento ha sido guardado con éxito.');

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
                  <th className={`${TdStyle.ThStyle} w-[15%]`}>Factura</th>                    <th className={TdStyle.ThStyle}>COD</th>
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
      ref={key === "factura" ? facturaInputRef : null}
      className={TdStyle.InputSmall}
      type="text"
      name={key}
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
                Agregar plancha
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
        message={"¿Estás seguro de que deseas agregar la plancha?"}
      />
    </section>
  );
};

export default TableIngreso;
