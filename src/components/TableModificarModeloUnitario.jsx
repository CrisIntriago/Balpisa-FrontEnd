import React, { useState, useEffect } from "react";
import ConfirmationModal from "./ConfirmationModal";
import useModeloUnitarioFromId from "../hooks/useModeloUnitarioFromId";
import useModificarModeloUnitario from "../hooks/useModificarModeloUnitario";

const TdStyle = {
  ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-bold text-white lg:py-7 lg:px-4`,
  TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium`,
  TdStyle2: `text-dark border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-base font-medium`,
  TdButton: `inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium`,
  InputSmall: `w-full max-w-xs px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-center`,
};

const TableModificarModeloUnitario = ({ modeloSeleccionado }) => {
    const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const { modelo } = useModeloUnitarioFromId(modeloSeleccionado);
    const { modificarModel } = useModificarModeloUnitario();
  
    const [values, setValues] = useState({
      nombre: "",
      precio: "",
      codContable: "",
      m2PorUnidad: "",  
    });
  
    useEffect(() => {
      if (modelo) {
        setValues({
          nombre: modelo.nombre || "",
          precio: modelo.precio?.toString() || "",
          codContable: modelo.codContable || "",
          m2PorUnidad: modelo.m2PorUnidad?.toString() || "",
        });
      }
    }, [modelo]);
  
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

  const handleOpenConfirmation = () => {
    setConfirmationModalOpen(true);
  };

  const handleCloseConfirmation = () => {
    setConfirmationModalOpen(false);
  };

  const handleConfirm = async () => {
    setConfirmationModalOpen(false);
    handleSave();
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
    };

    try {
      await modificarModel(modeloSeleccionado, datosModelo);
    } catch (error) {
      alert("Hubo un error al modificar el modelo.");
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100 p-6 ">
      <div className="max-w-full overflow-x-auto">
        <p className="font-bold text-xl mt-10 text-center md:w-1/2 lg:w-1/2 mx-auto pb-10">
          Modificar los datos del modelo {modelo.nombre}
        </p>
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
          className="bg-blue-500 hover:bg-blue-700 text-white mx-5 py-2 px-4 rounded"
          onClick={handleOpenConfirmation}
        >
          Guardar cambios
        </button>
      </div>
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirm}
        header={"Confirmación de modificación"}
        message={
          "¿Estás seguro de que deseas modificar los datos del modelo?"
        }
      />
    </div>
  );
};

export default TableModificarModeloUnitario;
