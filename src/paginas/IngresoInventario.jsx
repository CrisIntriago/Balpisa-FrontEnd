import React, { useState, useEffect } from 'react'; 
import useFamilias from '../hooks/useFamilias';
import ComboBox from '../components/ComboBox';
import useModelosPorFamilia from '../hooks/useModeloPorFamilia';
import useBodegas from '../hooks/useBodegas';
import Table from '../components/Table';

const IngresoInventario = () => {
  const [familiaSeleccionada, setFamiliaSeleccionada] = useState('');
  const [modeloSeleccionado, setModeloSeleccionado] = useState('');
  const [bodegaSeleccionada, setBodegaSeleccionada] = useState('');
  const [tablaVisible, setTablaVisible] = useState(false);

  const { familias } = useFamilias();
  const { modelos } = useModelosPorFamilia(familiaSeleccionada);
  const { bodegas } = useBodegas();

  useEffect(() => {
    setModeloSeleccionado('');
    setBodegaSeleccionada('');
    setTablaVisible(false);
  }, [familiaSeleccionada]);

  const handleFamiliaSelect = selectedOption => {
    setFamiliaSeleccionada(selectedOption ? selectedOption.value : '');
  };

  const handleModeloSelect = selectedOption => {
    setModeloSeleccionado(selectedOption ? selectedOption.value : '');
  };

  const handleBodegaSelect = selectedOption => {
    setBodegaSeleccionada(selectedOption ? selectedOption.value : '');
  };

  const handleBuscarClick = () => {
    if (familiaSeleccionada && bodegaSeleccionada) {
      setTablaVisible(true);
    } else {
      alert("Por favor, completa todas las secciones requeridas.");
    }
  };

  const opcionesFamilias = familias.map(({ id, nombre }) => ({ value: id, label: nombre }));
  const opcionesModelos = [{ value: '', label: "Todos" }, ...modelos.map(modelo => ({ value: modelo.id, label: modelo.nombre }))];
  const opcionesBodegas = bodegas.map(({ id, nombre }) => ({ value: id, label: nombre }));

  return (
    <div className=" flex flex-col items-center bg-gray-100">
        <>
          <div className="flex justify-between my-10 mx-4 md:mx-auto w-full md:w-3/4 lg:w-1/3">
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
                    label={"Bodega"}
                />
              </>
            )}
          </div>
          {familiaSeleccionada && (
            <button
              onClick={handleBuscarClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Buscar
            </button>
          )}
          {tablaVisible && (
            <Table 
            familiaSeleccionada={familiaSeleccionada} 
            modeloSeleccionado={modeloSeleccionado} />
          )}
        </>
    </div>
  );
};

export default IngresoInventario;