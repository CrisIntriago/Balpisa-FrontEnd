import React, { useState } from "react";
import Loading from "./Loading";
import ConfirmationModal from "./ConfirmationModal";
import useAgregarModeloUnitario from "../hooks/useAgregarModeloUnitario";

const TdStyle = {
  ThStyle: `w-1/10 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-bold text-white lg:py-7 lg:px-4`,
  TdStyle: `w-1/10 text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-1 text-center text-base font-medium`, 
  InputSmall: `w-full max-w-md px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-center`,
};

const TableIngresoModeloUnitario = ({familiaSeleccionada}) => {
  const initialState = {
    nombre: "",
    precio: "",
    codContable: "",
    m2PorUnidad: "",
  };

  const [values, setValues] = useState(initialState);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const { enviarModelo } = useAgregarModeloUnitario();

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
  const handleSave = async () => {
    const { nombre, codContable, m2PorUnidad, precio } = values;
    if (
      nombre === "" ||
      codContable === "" ||
      m2PorUnidad === "" ||
      precio == ""
    ) {
      alert("Por favor, complete todos los campos antes de guardar.");
      return;
    }

    const datosModelo = {
      nombre: nombre,
      codContable: codContable,
      m2PorUnidad: parseFloat(m2PorUnidad),
      precio: parseFloat(precio),
      familiaId: familiaSeleccionada,
    };

    try {
      await enviarModelo(datosModelo);
    } catch (error) {
      alert("Hubo un error al guardar el modelo.");
      console.error(error);
    }
  };

  const handleInputChange = (e, field) => {
    let value = e.target.value.replace(",", ".");
 
      const numericFields = ["precio", "m2PorUnidad"];
  
      if (numericFields.includes(field)) {
        if ((/^\d*\.?\d{0,2}$/.test(value)) || value === "") {
          setValues({ ...values, [field]: value });
        } else {
          return; // Si no cumple con las restricciones, no actualizar.
        }
      } else {
        setValues({ ...values, [field]: value });
      }
  };

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
              >
                <table className="w-full table-fixed">
                  <thead className="text-center bg-primary">
                    <tr>
                      <th className={TdStyle.ThStyle}>Nombre</th>
                      <th className={TdStyle.ThStyle}>Precio/m<sup>2</sup> ($)</th>
                      <th className={TdStyle.ThStyle}>Código Contable</th>
                      <th className={TdStyle.ThStyle}>Total m<sup>2</sup></th>
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
                Agregar modelo
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirm}
        header={"Confirmación de ingreso"}
        message={"¿Estás seguro de que deseas agregar el modelo?"}
      />
    </section>
  );
};

export default TableIngresoModeloUnitario;
