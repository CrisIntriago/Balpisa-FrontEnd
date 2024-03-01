import React, { useState, useEffect } from 'react'; 
import useFamilias from '../hooks/useFamilias';
import ComboBox from '../components/ComboBox';
import useModelosPorFamilia from '../hooks/useModeloPorFamilia';
import useBodegas from '../hooks/useBodegas';
import TableSalida from '../components/TableSalida';
import usePlanchasSimple from '../hooks/usePlanchasSimple';
import TableIngreso from '../components/TableIngreso';
import TablePlanchaIndividual from '../components/TablePlanchaIndividual';
import TableModificarPlancha from '../components/TableModificarPlancha';

const Movimientos = ({ opcion }) => {
  const [familiaSeleccionada, setFamiliaSeleccionada] = useState('');
  const [modeloSeleccionado, setModeloSeleccionado] = useState('');
  const [bodegaSeleccionada, setBodegaSeleccionada] = useState('');
  const [planchaSeleccionada, setPlanchaSeleccionada] = useState('');
  const [tablaVisible, setTablaVisible] = useState(false);

  const { familias } = useFamilias();
  const { modelos } = useModelosPorFamilia(familiaSeleccionada);
  const { bodegas } = useBodegas();
  const { planchas } = usePlanchasSimple(modeloSeleccionado, bodegaSeleccionada);

  useEffect(() => {
    setModeloSeleccionado('');
    setBodegaSeleccionada('');
    setPlanchaSeleccionada('');
    setTablaVisible(false);
  }, [familiaSeleccionada]);

  useEffect(() => {
    setFamiliaSeleccionada('');
    setModeloSeleccionado('');
    setBodegaSeleccionada('');
    setPlanchaSeleccionada('');
    setTablaVisible(false);
  }, [opcion]);


  const handleFamiliaSelect = selectedOption => {
    setFamiliaSeleccionada(selectedOption ? selectedOption.value : '');
  };

  const handleModeloSelect = selectedOption => {
    setModeloSeleccionado(selectedOption ? selectedOption.value : '');
  };

  const handleBodegaSelect = selectedOption => {
    setBodegaSeleccionada(selectedOption ? selectedOption.value : '');
  };

  const handlePlanchaSelect = selectedOption => {
    setPlanchaSeleccionada(selectedOption ? selectedOption.value : '');
  };

  const handleBuscarClick = () => {
    if (familiaSeleccionada &&
    modeloSeleccionado &&
    bodegaSeleccionada &&
    (opcion !== "Salida Inventario" || (opcion === "Salida Inventario" && planchaSeleccionada))) {
      setTablaVisible(true);
    } else {
      alert("Por favor, completa todas las secciones requeridas.");
    }
  };

  const opcionesFamilias = familias.map(({ id, nombre }) => ({ value: id, label: nombre }));
  const opcionesModelos = modelos.map(({id, nombre}) => ({ value: id, label: nombre }));
  const opcionesBodegas = bodegas.map(({ id, nombre }) => ({ value: id, label: nombre }));
  const opcionesPlanchas = planchas.map(({ id, nombre}) => ({ value: id, label: nombre }))

  return (
    <div className=" flex flex-col items-center bg-gray-100">
        <>
          <p className="font-bold text-4xl mt-10 text-center md:w-1/2 lg:w-1/2 mx-auto pb-10 ">{opcion}</p>
          <div className="flex justify-between mb-10 mx-4 md:mx-auto w-full md:w-1/2 lg:w-1/2">
            <ComboBox
              placeholder="Seleccione una familia"
              value={familiaSeleccionada}
              onChange={handleFamiliaSelect}
              options={opcionesFamilias}
              label={"Familia"}
            />
            {familiaSeleccionada && (
              <>
                <ComboBox
                  placeholder="Seleccione un modelo"
                  value={modeloSeleccionado}
                  onChange={handleModeloSelect}
                  options={opcionesModelos}
                  label={"Modelo"}
                />

                <ComboBox
                    placeholder="Seleccione una bodega"
                    value={bodegaSeleccionada}
                    onChange={handleBodegaSelect}
                    options={opcionesBodegas}
                    label={opcion==="Cambio Bodega" ? "Bodega Origen" : "Bodega"}
                />

                {(bodegaSeleccionada && modeloSeleccionado && (opcion==="Salida Inventario" || opcion==="Cambio Bodega" || opcion==="Modificar Plancha")) && (
                  <ComboBox
                  placeholder="Seleccione una plancha"
                  value={planchaSeleccionada}
                  onChange={handlePlanchaSelect}
                  options={opcionesPlanchas}
                  label={"Plancha"}
              />

                )}

              </>
            )}
          </div>
          {(familiaSeleccionada && modeloSeleccionado && bodegaSeleccionada ) && (
            <div className="flex justify-center mb-10 mx-4 md:mx-auto w-full md:w-1/2 lg:w-1/2">
            <button
              onClick={handleBuscarClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Buscar
            </button>
            </div>
          )}
          {tablaVisible && opcion === "Ingreso Inventario" && (
            <TableIngreso 
            modeloSeleccionado={modeloSeleccionado} 
            bodegaSeleccionada={bodegaSeleccionada}
            />
          )}
          {tablaVisible && opcion === "Salida Inventario" && (
            <TableSalida 
            familiaSeleccionada={familiaSeleccionada} 
            modeloSeleccionado={modeloSeleccionado} 
            planchaSeleccionada={planchaSeleccionada}/>
          )}
          {tablaVisible && opcion === "Cambio Bodega" && (
            <TablePlanchaIndividual
            planchaSeleccionada={planchaSeleccionada} 
            bodegaSeleccionada={bodegaSeleccionada}
            opcionesBodegas={opcionesBodegas}
            />
          )}
          {tablaVisible && opcion === "Modificar Plancha" && (
            <TableModificarPlancha 
            planchaSeleccionada={planchaSeleccionada}/>
          )}

        </>
    </div>
  );
};

export default Movimientos;