import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import Plancha from '../components/Plancha'; 
import useFamilias from '../hooks/useFamilias';
import ComboBox from '../components/ComboBox';
import useModelosPorFamilia from '../hooks/useModeloPorFamilia';


const Home = () => {
  const [familiaSeleccionada, setFamiliaSeleccionada] = useState('');
  const [modeloSeleccionado, setModeloSeleccionado] = useState('');
  const [bodegaSeleccionada, setBodegaSeleccionada] = useState('');
  const [tablaVisible, setTablaVisible] = useState(false);
  const [searchMode, setSearchMode] = useState('modelo');

  const { familias } = useFamilias(); // Hook personalizado para obtener las familias
  const { modelos } = useModelosPorFamilia(familiaSeleccionada); // Hook personalizado para obtener los modelos basados en la familia seleccionada

  // Simulación de datos de bodegas
  const bodegas = [
      { id: 'b1', nombre: 'Bodega 1' },
      { id: 'b2', nombre: 'Bodega 2' },
      { id: 'b3', nombre: 'Bodega 3' },
  ];

  useEffect(() => {
      setFamiliaSeleccionada('');
      setModeloSeleccionado('');
      setBodegaSeleccionada('');
      setTablaVisible(false);
  }, [searchMode]);

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
      if (familiaSeleccionada && (searchMode === 'modelo' || (searchMode === 'plancha' && bodegaSeleccionada))) {
          setTablaVisible(true);
      } else {
          alert("Por favor, completa la selección requerida.");
      }
  };

  // Opciones para ComboBox
  const opcionesFamilias = familias.map(({ id, nombre }) => ({ value: id, label: nombre }));
  const opcionesModelos = [{ value: '', label: "Todos" }, ...modelos.map(modelo => ({ value: modelo.id, label: modelo.nombre }))];
  const opcionesBodegas = bodegas.map(({ id, nombre }) => ({ value: id, label: nombre }));

  return (
      <div className="flex flex-col items-center bg-gray-100">
          {/* Botones para cambiar entre modos de búsqueda */}
          
          <div className="mb-10 mt-10">
              <button
                  className={`rounded-md px-7 py-3 text-base font-medium ${searchMode === 'modelo' ? 'bg-primary text-white hover:bg-primary/90' : 'bg-gray-300 text-black hover:bg-gray-400'} mx-10`}
                  onClick={() => setSearchMode('modelo')}
              >
                  Búsqueda Modelo
              </button>
              <button
                  className={`rounded-md px-7 py-3 text-base font-medium ${searchMode === 'plancha' ? 'bg-primary text-white hover:bg-primary/90' : 'bg-gray-300 text-black hover:bg-gray-400'} mx-10`}
                  onClick={() => setSearchMode('plancha')}
              >
                  Búsqueda Plancha
              </button>
          </div>

          {(searchMode === 'modelo' || searchMode === 'plancha') && (
              <>
                  <div className="flex justify-between mb-4 mx-4 md:mx-auto w-full md:w-3/4 lg:w-1/3">
                      <ComboBox
                          placeholder="Seleccione una familia"
                          value={familiaSeleccionada}
                          onChange={handleFamiliaSelect}
                          options={opcionesFamilias}
                      />
                      {familiaSeleccionada && (
                          <>
                              <ComboBox
                                  placeholder="Seleccione un modelo"
                                  value={modeloSeleccionado}
                                  onChange={handleModeloSelect}
                                  options={opcionesModelos}
                              />
                              {searchMode === 'plancha' && (
                                  <ComboBox
                                      placeholder="Seleccione una bodega"
                                      value={bodegaSeleccionada}
                                      onChange={handleBodegaSelect}
                                      options={opcionesBodegas}
                                  />
                              )}
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
                      // Asume que tienes un componente Table para mostrar los resultados
                      // <Table familiaSeleccionada={familiaSeleccionada} modeloSeleccionado={modeloSeleccionado} bodegaSeleccionada={bodegaSeleccionada} />
                      // Por simplicidad, solo mostraremos un mensaje aquí
                      <p>Mostrando resultados para la familia {familiaSeleccionada}, modelo {modeloSeleccionado}, y bodega {bodegaSeleccionada}.</p>
                  )}
              </>
          )}

          {/* Aquí puedes agregar cualquier otro caso de búsqueda si es necesario */}
      </div>
  );
};

export default Home;