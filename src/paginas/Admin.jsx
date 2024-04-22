import React, { useState, useEffect } from "react";
import useFamilias from "../hooks/useFamilias";
import ComboBox from "../components/ComboBox";
import TableIngresoModeloUnitario from "../components/TableIngresoModeloUnitario";
import TableIngresoModelo from "../components/TableIngresoModelo";
import useModelosPorFamilia from "../hooks/useModeloPorFamilia";
import useModelosUnitariosPorFamilia from "../hooks/useModelosUnitariosFromFamilia";
import TableModificarModelo from "../components/TableModificarModelo";
import TableModificarModeloUnitario from "../components/TableModificarModeloUnitario";

const Admin = ({ opcion }) => {
  const [familiaSeleccionada, setFamiliaSeleccionada] = useState("");
  const [modeloSeleccionado, setModeloSeleccionado] = useState("");
  const [tablaVisible, setTablaVisible] = useState(false);
  const familiasUnitarias = ["Porcelanato", "Ceramica"];
  

  const { familias } = useFamilias();
  const { modelos } = useModelosPorFamilia(familiaSeleccionada);
  const { modelosUnitarios } =
    useModelosUnitariosPorFamilia(familiaSeleccionada);


  useEffect(() => {
    setFamiliaSeleccionada("");
    setModeloSeleccionado("");
    setTablaVisible(false);
  }, [opcion]);

  const handleFamiliaSelect = (selectedOption) => {
    setFamiliaSeleccionada(selectedOption ? selectedOption.value : "");
  };
  const handleModeloSelect = (selectedOption) => {
    setModeloSeleccionado(selectedOption ? selectedOption.value : "");
  };

  const handleBuscarClick = () => {
    if ((familiaSeleccionada && opcion==="Agregar Modelo") || (familiaSeleccionada && modeloSeleccionado)) {
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
    const opcionesModelos = modelos.map(({ id, nombre }) => ({
      value: id,
      label: nombre,
    }));
    const opcionesModelosUnitarios = modelosUnitarios.map((modelo) => ({
      value: modelo.id,
      label: modelo.nombre,
    }));

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
          {(familiaSeleccionada && opcion==="Modificar Modelo") && (
            <>
              <ComboBox
                placeholder="Seleccione un modelo"
                value={modeloSeleccionado}
                onChange={handleModeloSelect}
                options={
                  idsFamiliasUnitarias.includes(familiaSeleccionada)
                    ? opcionesModelosUnitarios
                    : opcionesModelos
                }
                label={"Modelo"}
              />
            </>
          )}
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
          <TableIngresoModeloUnitario
          familiaSeleccionada={familiaSeleccionada}
          />
        )}
        {tablaVisible && opcion === "Agregar Modelo" && !idsFamiliasUnitarias.includes(familiaSeleccionada) && (
          <TableIngresoModelo
          familiaSeleccionada={familiaSeleccionada}
          />
        )}
        {tablaVisible && opcion === "Modificar Modelo" && idsFamiliasUnitarias.includes(familiaSeleccionada) && (
          <TableModificarModeloUnitario
          modeloSeleccionado={modeloSeleccionado}
          />
        )}
        {tablaVisible && opcion === "Modificar Modelo" && !idsFamiliasUnitarias.includes(familiaSeleccionada) && (
          <TableModificarModelo
          modeloSeleccionado={modeloSeleccionado}
          />
        )}
      </>
    </div>
  );
};

export default Admin;
