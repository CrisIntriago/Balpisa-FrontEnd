import React, { useState, useEffect } from "react";
import ConfirmationModal from "./ConfirmationModal";
import useActualizarPlancha from "../hooks/useActualizarPlancha";
import useAgregarMovimiento from "../hooks/useAgregarMovimiento";
import usePlanchaFromId from "../hooks/usePlanchaFromId";

const TdStyle = {
  ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-bold text-white lg:py-7 lg:px-4`,
  TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium`,
  TdStyle2: `text-dark border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-base font-medium`,
  TdButton: `inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium`,
  InputSmall: `w-full max-w-xs px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-center`,
};

const TableModificarPlancha = ({ planchaSeleccionada }) => {
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [values, setValues] = useState({
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

  const { enviarPlanchaActualizada } = useActualizarPlancha();
  const { enviarMovimiento } = useAgregarMovimiento();

  const { plancha } = usePlanchaFromId(planchaSeleccionada);


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

  useEffect(() => {
    if (plancha && plancha.alto && plancha.ancho) {
      const { nombre, alto, ancho, despunte1A, despunte1B, despunte2A, despunte2B, despunte3A, despunte3B } = plancha;
      console.log(plancha)
      setValues({
        ...values,  
        COD: nombre,
        alto: alto.toString(),
        ancho: ancho.toString(),
        D1A: despunte1A.toString(),
        D1B: despunte1B.toString(),
        D2A: despunte2A.toString(),
        D2B: despunte2B.toString(),
        D3A: despunte3A.toString(),
        D3B: despunte3B.toString(),
      });
    }
  }, [plancha]);

  const handleInputChange = (e, field) => {
    let value = e.target.value;
    value = value.replace(",", ".");
      // Campos con restricción de valores numéricos del 0 al 9.99
      const restrictedFields = ["alto", "ancho", "D1A", "D1B", "D2A", "D2B", "D3A", "D3B"];
      if (restrictedFields.includes(field)) {
        if ((/^\d*\.?\d{0,2}$/.test(value) && value <= 9.99) || value === "") {
          setValues({ ...values, [field]: value });
        }
      } else {
        // Para campos no numéricos o sin restricciones específicas, actualizar directamente
        setValues({ ...values, [field]: value });
      }
  };
  const handleSave = async () => {
    const {
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
    const m2Usados = (
      alto * ancho -
      D1A * D1B -
      D2A * D1B -
      D3A * D3B
    ).toFixed(2);

    const datosMovimiento = {
      valorRegistro: `${m2Usados}`,
      planchaId: planchaSeleccionada,
      nFactura: "000-000-000000000",
      precioVenta: 0,
      tipo: "Desperfecto",
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

  return (
    <div className="bg-gray-100 p-6 ">
      <div className="max-w-full overflow-x-auto">
        <p className="font-bold text-xl mt-10 text-center md:w-1/2 lg:w-1/2 mx-auto pb-10">
          Modificar los datos de la plancha {plancha.nombre}
        </p>
        <table className="w-full table-fixed">
          <thead className="text-center bg-primary">
            <tr>
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
          "¿Estás seguro de que deseas modificar los datos de la plancha?"
        }
      />
    </div>
  );
};

export default TableModificarPlancha;
