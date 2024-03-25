import React, { forwardRef } from 'react';
import useImprimirMovimientos from '../hooks/useImprimirMovimientos';

const TdStyle = {
    ThStyle: `border-black border-2`,
    TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium`,
    TdStyle2: `text-dark border-black border-2 bg-white py-5 px-2 text-center text-base font-medium`,
  };

const TablaParaImprimir = forwardRef(({ fechaInicio, fechaFin }, ref) => {

    const { movimientos } = useImprimirMovimientos(fechaInicio, fechaFin);

    return (
        <div ref={ref}>
            <p className="font-bold text-2xl mt-10 text-center md:w-1/2 mx-auto pb-10 ">Movimiento de Granito / Quarcita y Onix/ Mármol </p>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className={TdStyle.ThStyle}>Tipo Movimiento</th>
                        <th className={TdStyle.ThStyle}>Bodega</th>
                        <th className={TdStyle.ThStyle}>Familia</th>
                        <th className={TdStyle.ThStyle}>Modelo</th>
                        <th className={TdStyle.ThStyle}>Plancha</th>
                        <th className={TdStyle.ThStyle}>Cód. Contable</th>
                        <th className={TdStyle.ThStyle}>Valor Registro</th>
                        <th className={TdStyle.ThStyle}>Factura</th>
                    </tr>
                </thead>
                <tbody>
                    {movimientos.movimientosPlanchas.map((mov, index) => (
                        <tr key={index}>
                            <td className={TdStyle.TdStyle2}>{mov.tipo}</td>
                            <td className={TdStyle.TdStyle2}>{mov.nombreBodega}</td>
                            <td className={TdStyle.TdStyle2}>{mov.nombreFamilia}</td>
                            <td className={TdStyle.TdStyle2}>{mov.nombreModelo}</td>
                            <td className={TdStyle.TdStyle2}>{mov.nombrePlancha}</td>
                            <td className={TdStyle.TdStyle2}>{mov.CodigoContable}</td>
                            <td className={TdStyle.TdStyle2}>{mov.valorRegistro}</td>
                            <td className={TdStyle.TdStyle2}>{mov.nFactura}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <p className="font-bold text-2xl mt-10 text-center md:w-1/2 mx-auto pb-10 ">Movimiento de Porcelanato, Cerámica, Ferretería y Varios </p>

            <table className="w-full table-fixed">
                    <thead className="w-full">
                      <tr>
                        <th className={TdStyle.ThStyle}>Tipo Movimiento</th>
                        <th className={TdStyle.ThStyle}>Nombre</th>
                        <th className={TdStyle.ThStyle}>Cód. Contable</th>
                        <th className={TdStyle.ThStyle}>Cantidad Cambiada</th>
                        <th className={TdStyle.ThStyle}>Valor Registro</th>
                        <th className={TdStyle.ThStyle}>nFactura</th>
                      </tr>
                    </thead>
                    <tbody>
                      {movimientos.movimientosUnitarios.map((mov, index) => (
                        <tr key={index}>
                          <td className={TdStyle.TdStyle2}>{mov.tipo}</td>
                          <td className={TdStyle.TdStyle2}>{mov.nombre}</td>
                          <td className={TdStyle.TdStyle2}>{mov.codContable}</td>
                          <td className={TdStyle.TdStyle2}>{mov.cantidadCambiada}</td>
                          <td className={TdStyle.TdStyle2}>{mov.valorRegistro}</td>
                          <td className={TdStyle.TdStyle2}>{mov.nFactura}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
        </div>
    );
});

export default TablaParaImprimir;