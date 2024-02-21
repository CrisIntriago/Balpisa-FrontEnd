import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import ComboBoxTipo from '../components/ComboBoxTipo';
import ComboBoxNombre from '../components/ComboBoxNombre';
import Plancha from '../components/Plancha'; 
import useFamilias from '../hooks/useFamilias';
import ComboBoxBodegas from '../components/ComboBoxBodegas';

const Home = () => {
  const [familiaSeleccionada, setFamiliaSeleccionada] = useState('');
  const [modeloSeleccionado, setModeloSeleccionado] = useState('');
  const [searchMode, setSearchMode] = useState('modelo'); 
  const { familias } = useFamilias();

  useEffect(() => {
    setFamiliaSeleccionada(null)
    setModeloSeleccionado(null)
  }, [searchMode])

  useEffect(() => {
    // Cada vez que el id de la familia seleccionada cambie, limpia la selección de modelo.
    setModeloSeleccionado(null);
}, [familiaSeleccionada]);

  const handleFamiliaSelect = (familia) => {
    setFamiliaSeleccionada(familia);
  };

  const handleModeloSelect = (modelo) => {
    setModeloSeleccionado(modelo);
  };



  return (
    <div className="flex flex-col items-center bg-gray-100">
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
          
      {searchMode === 'modelo' && (
  <>
    <div className="flex justify-between mb-4 mx-4 md:mx-auto w-full md:w-3/4 lg:w-1/3">
      <ComboBoxTipo 
        onSelectFamilia={handleFamiliaSelect} 
        familias={familias}
      />
      {familiaSeleccionada && <ComboBoxNombre 
        familiaSeleccionada={familiaSeleccionada} 
        onSelectModelo={handleModeloSelect} 
        modeloSeleccionado={modeloSeleccionado}
      />}
    </div>

    <Table 
      familiaSeleccionada={familiaSeleccionada}
      modeloSeleccionado={modeloSeleccionado}
      arreglo={[]}
    />
  </>
)}

      {searchMode === 'plancha' && (
  <>
    <div className="flex justify-between mb-4 mx-4 md:mx-auto w-full md:w-3/4 lg:w-1/3">
      <ComboBoxTipo 
        onSelectFamilia={handleFamiliaSelect} 
        familias={familias}
      />
      {familiaSeleccionada && (<ComboBoxNombre 
        familiaSeleccionada={familiaSeleccionada} 
        onSelectModelo={handleModeloSelect} 
        modeloSeleccionado={modeloSeleccionado}
      />
      )}
    </div>

    <Plancha/>      
  </>

      )}
    </div>
  );
};

export default Home;