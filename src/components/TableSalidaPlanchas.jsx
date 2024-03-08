import React, { useState, useEffect } from "react";
import usePlanchaFromId from "../hooks/usePlanchaFromId";
import useGastarPlancha from "../hooks/useGastarPlancha";
import useAgregarMovimiento from "../hooks/useAgregarMovimiento";

const styles = {
  tableHeader:
    "w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-bold text-white lg:py-7 lg:px-4",
  tableData:
    "text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium",
  inputSmall:
    "w-full max-w-xs px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-center",
  button:
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2 my-2",
};

const TableSalidaPlanchas = ({ planchaSeleccionada }) => {
  const { planchas } = usePlanchaFromId(planchaSeleccionada);
  const [editableData, setEditableData] = useState([]);
  const [addedData, setAddedData] = useState([]);
  const numericFields = [
    "alto",
    "ancho",
    "D1A",
    "D1B",
    "D2A",
    "D2B",
    "D3A",
    "D3B",
  ];

  const { enviarMovimiento } = useAgregarMovimiento();

  const { gastarPlanchaPorId } = useGastarPlancha();

  useEffect(() => {
    const initialData = planchas.map((plancha) => {
      const totalM2 = calculateTotalM2(plancha);
      return {
        ...plancha,
        totalM2: totalM2,
        precioTotal: totalM2 * plancha.preciom2,
        factura: "000-000-000000000",
      };
    });
    setEditableData(initialData);
  }, [planchas]);

  const handleInputChange = (index, key, value) => {
    const newData = [...editableData];

    if (key === "factura") {
      let cursorPosition = document.activeElement.selectionStart; // Captura la posición actual del cursor antes de cambiar el valor.
      let digits = value.replace(/\D/g, "");
      if (digits.length > 15) digits = digits.substring(0, 15);
      value = `${digits.substring(0, 3)}-${digits.substring(
        3,
        6
      )}-${digits.substring(6)}`.padEnd(15, "0");
      newData[index][key] = value;

      setTimeout(() => {
        let element = document.activeElement;
        element.setSelectionRange(cursorPosition, cursorPosition);
      }, 1);
    } else if (numericFields.includes(key)) {
      if (
        /^\d*\.?\d{0,2}$/.test(value) &&
        (parseFloat(value) <= 9.99 || value === "")
      ) {
        newData[index][key] = value === "" ? 0 : parseFloat(value);
      } else {
        return;
      }
    } else {
      newData[index][key] = value;
    }
    setEditableData(newData);
  };

  const calculateTotalM2 = ({
    alto,
    ancho,
    despunte1A,
    despunte1B,
    despunte2A,
    despunte2B,
    despunte3A,
    despunte3B,
  }) =>
    (
      +alto * +ancho -
      +despunte1A * +despunte1B -
      +despunte2A * +despunte2B -
      +despunte3A * +despunte3B
    ).toFixed(2);

  const handleHacerSalidas = async () => {
    for (const { id, totalM2, precioTotal, factura } of addedData) {
      if (!id || !factura || !precioTotal || !totalM2) {
        alert("Por favor, complete todos los campos antes de guardar.");
        return;
      }

      const datosMovimiento = {
        valorRegistro: totalM2,
        planchaId: id,
        nFactura: factura,
        precioVenta: precioTotal,
        tipo: "Salida",
      };

      try {
        await enviarMovimiento(datosMovimiento);
      } catch (error) {
        alert("Hubo un error al guardar el movimiento.");
        console.error(error);
      }

      try {
        await gastarPlanchaPorId(id);
      } catch (error) {
        alert("Hubo un error al hacer la salida");
        console.error(error);
      }
    }
  };

  const handleCalculate = (index) => {
    const newData = [...editableData];
    const plancha = newData[index];
    const totalM2 = calculateTotalM2(plancha);
    plancha.totalM2 = totalM2;
    plancha.precioTotal = totalM2 * plancha.preciom2;
    setEditableData(newData);
  };

  const handleAddPlancha = (index) => {
    const planchaToAdd = { ...editableData[index] };
    setAddedData(addedData.concat(planchaToAdd));
  };

  return (
    <section className="bg-gray-100 py-20 lg:py-[50px] w-full">
      <div className="container mx-auto">
        <h2 className="text-xl font-bold mt-8 mb-4 text-center"></h2>
        <table className="w-full table-fixed">
          <thead className="text-center bg-primary">
            <tr>
              {[
                "Factura",
                "COD",
                "Alto",
                "Ancho",
                "D1A",
                "D1B",
                "D2A",
                "D2B",
                "D3A",
                "D3B",
                "Total m²",
                "Precio Total",
                "Acciones",
              ].map((header) => (
                <th
                  key={header}
                  className={`${styles.tableHeader} ${
                    header === "Factura" || header === "Acciones"
                      ? "w-[32%]"
                      : ""
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {editableData.map((plancha, index) => (
              <tr key={index}>
                <td className={styles.tableData}>
                  <input
                    type="text"
                    className={styles.inputSmall}
                    value={plancha.factura}
                    onChange={(e) =>
                      handleInputChange(index, "factura", e.target.value)
                    }
                    pattern="\d*"
                  />
                </td>
                <td className={styles.tableData}>
                  <input
                    type="text"
                    className={styles.inputSmall}
                    value={plancha.nombre}
                    onChange={(e) =>
                      handleInputChange(index, "nombre", e.target.value)
                    }
                  />
                </td>
                <td className={styles.tableData}>
                  <input
                    type="number"
                    className={styles.inputSmall}
                    value={plancha.alto}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "alto",
                        parseFloat(e.target.value)
                      )
                    }
                    style={{
                      WebkitAppearance: "none",
                      MozAppearance: "textfield",
                    }}
                  />
                </td>
                <td className={styles.tableData}>
                  <input
                    type="number"
                    className={styles.inputSmall}
                    value={plancha.ancho}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "ancho",
                        parseFloat(e.target.value)
                      )
                    }
                    style={{
                      WebkitAppearance: "none",
                      MozAppearance: "textfield",
                    }}
                  />
                </td>
                {[
                  "despunte1A",
                  "despunte1B",
                  "despunte2A",
                  "despunte2B",
                  "despunte3A",
                  "despunte3B",
                ].map((despunte) => (
                  <td key={despunte} className={styles.tableData}>
                    <input
                      type="number"
                      className={styles.inputSmall}
                      value={plancha[despunte]}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          despunte,
                          parseFloat(e.target.value)
                        )
                      }
                      style={{
                        WebkitAppearance: "none",
                        MozAppearance: "textfield",
                      }}
                    />
                  </td>
                ))}
                <td className={styles.tableData}>{plancha.totalM2}</td>
                <td className={styles.tableData}>
                  <input
                    type="text"
                    className={styles.inputSmall}
                    value={plancha.precioTotal}
                    onChange={(e) =>
                      handleInputChange(index, "precioTotal", e.target.value)
                    }
                  />
                </td>
                <td className={styles.tableData}>
                  <button
                    className={styles.button}
                    onClick={() => handleCalculate(index)}
                  >
                    Calcular
                  </button>
                  <button
                    className={styles.button}
                    onClick={() => handleAddPlancha(index)}
                  >
                    Agregar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="text-xl font-bold mt-8 mb-4">Planchas Agregadas</h2>
        <table className="w-full table-fixed">
          <thead className="text-center bg-primary">
            <tr>
              {["Factura", "COD", "Total m²", "Precio Total"].map((header) => (
                <th key={header} className={styles.tableHeader}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {addedData.map((plancha, index) => (
              <tr key={`added-${index}`}>
                <td className={styles.tableData}>{plancha.factura}</td>
                <td className={styles.tableData}>{plancha.nombre}</td>
                <td className={styles.tableData}>{plancha.totalM2}</td>
                <td className={styles.tableData}>{plancha.precioTotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          <button
            className={styles.button}
            onClick={() => handleHacerSalidas()}
          >
            Hacer Salidas
          </button>
        </div>
      </div>
    </section>
  );
};

export default TableSalidaPlanchas;
