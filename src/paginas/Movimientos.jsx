import React, { useState, useEffect } from 'react'; 
import useFamilias from '../hooks/useFamilias';
import ComboBox from '../components/ComboBox';
import useModelosPorFamilia from '../hooks/useModeloPorFamilia';
import useBodegas from '../hooks/useBodegas';
import TableSalida from '../components/TableSalida';
import Table from '../components/Table';
import usePlanchasSimple from '../hooks/usePlanchasSimple';

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
    if (familiaSeleccionada && modeloSeleccionado && bodegaSeleccionada && planchaSeleccionada) {
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
          <p className="font-bold text-4xl mt-10 text-center md:w-1/2 mx-auto pb-10 ">{opcion}</p>
          <div className="flex justify-between mb-10 mx-4 md:mx-auto w-full md:w-3/4 lg:w-1/3">
            <ComboBox
              placeholder="Seleccione una familia"
              value={familiaSeleccionada}
              onChange={handleFamiliaSelect}
              options={opcionesFamilias}
              width={220}
              label={"Familia"}
            />
            {familiaSeleccionada && (
              <>
                <ComboBox
                  placeholder="Seleccione un modelo"
                  value={modeloSeleccionado}
                  onChange={handleModeloSelect}
                  options={opcionesModelos}
                  width={220}
                  label={"Modelo"}
                />

                <ComboBox
                    placeholder="Seleccione una bodega"
                    value={bodegaSeleccionada}
                    onChange={handleBodegaSelect}
                    options={opcionesBodegas}
                    width={230}
                    label={"Bodega"}
                />

                {(bodegaSeleccionada && modeloSeleccionado && opcion==="Salida Inventario") && (
                  <ComboBox
                  placeholder="Seleccione una plancha"
                  value={planchaSeleccionada}
                  onChange={handlePlanchaSelect}
                  options={opcionesPlanchas}
                  width={230}
                  label={"Plancha"}
              />

                )}

              </>
            )}
          </div>
          {(familiaSeleccionada && modeloSeleccionado && bodegaSeleccionada && planchaSeleccionada) && (
            <button
              onClick={handleBuscarClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Buscar
            </button>
          )}
          {tablaVisible && opcion === "Ingreso Inventario" && (
            <Table 
            familiaSeleccionada={familiaSeleccionada} 
            modeloSeleccionado={modeloSeleccionado} />
          )}
          {tablaVisible && opcion === "Salida Inventario" && (
            <TableSalida 
            familiaSeleccionada={familiaSeleccionada} 
            modeloSeleccionado={modeloSeleccionado} 
            planchaSeleccionada={planchaSeleccionada}/>
          )}
          {tablaVisible && opcion === "Cambio Bodega" && (
            <Table 
            familiaSeleccionada={familiaSeleccionada} 
            modeloSeleccionado={modeloSeleccionado} />
          )}
          {tablaVisible && opcion === "Modificar Plancha" && (
            <Table 
            familiaSeleccionada={familiaSeleccionada} 
            modeloSeleccionado={modeloSeleccionado} />
          )}

        </>
    </div>
  );
};

export default Movimientos;