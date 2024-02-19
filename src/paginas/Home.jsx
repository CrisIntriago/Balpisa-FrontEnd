import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import ComboBoxTipo from '../components/ComboBoxTipo';
import ComboBoxNombre from '../components/ComboBoxNombre';
import Plancha from '../components/Plancha'; 
import useCeramicas from '../hooks/useCeramicas';

const Home = () => {
  const [tipoSeleccionado, setTipoSeleccionado] = useState('');
  const [nombreSeleccionado, setNombreSeleccionado] = useState('');
  const [searchMode, setSearchMode] = useState('modelo'); 
  const [isLoading, ceramicas] = useCeramicas();

  useEffect(() => {
    setTipoSeleccionado('')
    setNombreSeleccionado('')
  }, [searchMode])

  const handleTipoSelect = (tipo) => {
    setTipoSeleccionado(tipo);
    setNombreSeleccionado('');
  };

  const handleNombreSelect = (nombre) => {
    setNombreSeleccionado(nombre);
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
          
      {/* Mostrar los componentes según el modo de búsqueda */}
      {searchMode === 'modelo' && (
        <div className="flex justify-between mb-4 mx-4 md:mx-auto w-full md:w-3/4 lg:w-1/3">
          <ComboBoxTipo 
            onSelectTipo={handleTipoSelect} 
            ceramicas={ceramicas}
          />
          {tipoSeleccionado && <ComboBoxNombre 
            tipoSeleccionado={tipoSeleccionado} 
            onSelectNombre={handleNombreSelect} 
            ceramicas={ceramicas}
          />}
        </div>
      )}

      {searchMode === 'modelo' && (
        <Table 
          tipoSeleccionado={tipoSeleccionado}
          nombreSeleccionado={nombreSeleccionado}
          ceramicas={ceramicas}
        />
      )}

      {searchMode === 'plancha' && (
        <Plancha />
      )}
    </div>
  );
};

export default Home;