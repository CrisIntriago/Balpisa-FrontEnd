import React, { useState, useEffect } from "react";
import useFamilias from "../hooks/useFamilias";
import ComboBox from "../components/ComboBox";

const Admin = ({ opcion }) => {
  const [familiaSeleccionada, setFamiliaSeleccionada] = useState("");
  const [tablaVisible, setTablaVisible] = useState(false);
  const familiasUnitarias = ["Porcelanato", "Ceramica", "Ferreteria", "Varios"];
  

  const { familias } = useFamilias();


  useEffect(() => {
    setFamiliaSeleccionada("");
    setTablaVisible(false);
  }, [opcion]);

  const handleFamiliaSelect = (selectedOption) => {
    setFamiliaSeleccionada(selectedOption ? selectedOption.value : "");
  };

  const handleBuscarClick = () => {
    if (familiaSeleccionada) {
      setTablaVisible(true);
    } else {
      alert("Por favor, completa todas las secciones requeridas.");
    }
  };

  const opcionesFamilias = familias.map(({ id, nombre }) => ({
    value: id,
    label: nombre,
  }));
  const idsFamiliasUnitarias = familias
    .filter((familia) => familiasUnitarias.includes(familia.nombre))
    .map((familia) => familia.id);

  return (
    <div className=" flex flex-col items-center bg-gray-100">
      <>
        <p className="font-bold text-4xl mt-10 text-center md:w-1/2 lg:w-1/2 mx-auto pb-10 ">
          {opcion}
        </p>
        <div className="flex justify-center mb-10 mx-4 md:mx-auto w-full md:w-1/2 lg:w-1/2">
          <ComboBox
            placeholder="Seleccione una familia"
            value={familiaSeleccionada}
            onChange={handleFamiliaSelect}
            options={opcionesFamilias}
            label={"Familia"}
          />
        </div>
        {(familiaSeleccionada) && (
          <div className="flex justify-center mb-10 mx-4 md:mx-auto w-full md:w-1/2 lg:w-1/2">
            <button
              onClick={handleBuscarClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Buscar
            </button>

          </div>
        )}
        {tablaVisible && opcion === "Agregar Modelo" && idsFamiliasUnitarias.includes(familiaSeleccionada) && (
          <p>MOSTRANDO TABLA AGREGAR MODELO PARA UNITARIAS</p>
        )}
        {tablaVisible && opcion === "Agregar Modelo" && !idsFamiliasUnitarias.includes(familiaSeleccionada) && (
          <p>MOSTRANDO TABLA AGREGAR MODELO PARA NOOOO UNITARIAS</p>
        )}
        {tablaVisible && opcion === "Modificar Modelo" && idsFamiliasUnitarias.includes(familiaSeleccionada) && (
          <p>MOSTRANDO TABLA MODIFICAR MODELO PARA  UNITARIAS</p>
        )}
        {tablaVisible && opcion === "Modificar Modelo" && !idsFamiliasUnitarias.includes(familiaSeleccionada) && (
          <p>MOSTRANDO TABLA MODIFICAR MODELO PARA NOOOO UNITARIAS</p>
        )}
      </>
    </div>
  );
};

export default Admin;
