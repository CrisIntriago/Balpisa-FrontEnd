import React, { forwardRef } from 'react';



const TablaParaImprimirInfoModelo = forwardRef(({ modeloSeleccionado }, ref) => {


    if (cargando) {
        return <div>Cargando movimientos...</div>;
      }
    
      if (!movimientos) {
        return <div>No hay datos disponibles.</div>;
      }

    return (
        <div ref={ref}>
            <p className="font-bold text-2xl mt-10 text-center md:w-1/2 mx-auto pb-10 ">Información General </p>
            <Table
                familiaSeleccionada={familiaSeleccionada}
                modeloSeleccionado={modeloSeleccionado}
                onVerPlanchasClick={mostrarPlanchasConSeleccion}
              />

            <p className="font-bold text-2xl mt-10 text-center md:w-1/2 mx-auto pb-10 ">Movimientos Realizados Por Modelo </p>

            <TableMovimientosPorModelo
                  modeloSeleccionado={modeloSeleccionado}
                  offset={-1}
                />
        </div>
    );
});

export default TablaParaImprimirInfoModelo;