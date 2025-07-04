import React, { forwardRef, useMemo, useState, useEffect } from "react";
import useMovimientosFromModeloUnitario from "../hooks/useMovimientosFromModeloUnitario";
import useModelosUnitariosCompletos from "../hooks/useModelosUnitariosCompletos";
import formatoFecha from "../config/formatoFecha";

const TdStyle = {
  ThStyle: `border-black border-2`,
  TdStyle1: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium`,
  TdStyle2: `text-dark border-black border-2 bg-white py-5 px-2 text-center text-base font-medium`,
};

const TablaParaImprimirInfoModeloUnitario = forwardRef(
  ({ modeloSeleccionado, familiaSeleccionada }, ref) => {
    const [cargando, setCargando] = useState(true);

    const { movimientos } = useMovimientosFromModeloUnitario(
      modeloSeleccionado,
      -1
    );

    const { modelosCompletos } =
      useModelosUnitariosCompletos(familiaSeleccionada);

    useEffect(() => {
      if (modeloSeleccionado) {
        setCargando(false);
      }
    }, [modeloSeleccionado]);

    const filteredElements = useMemo(() => {
      let filtered = modelosCompletos;
      if (familiaSeleccionada !== "" && modeloSeleccionado !== "") {
        filtered = modelosCompletos.filter(
          (modelo) => modelo.id === modeloSeleccionado
        );
      }
      return filtered;
    }, [modelosCompletos, familiaSeleccionada, modeloSeleccionado]);

    if (cargando) {
      return <div>Cargando Información del modelo...</div>;
    }

    if (!modeloSeleccionado) {
      return <div>No hay datos disponibles.</div>;
    }

    return (
      <div ref={ref}>
        <p className="font-bold text-2xl mt-10 text-center md:w-1/2 mx-auto pb-10 ">
          Información General{" "}
        </p>
        <table className="w-full">
          <thead className="text-center bg-primary">
            <tr>
              <th className={TdStyle.ThStyle}>Modelo</th>
              <th className={TdStyle.ThStyle}>Unidades</th>
              <th className={TdStyle.ThStyle}>
                m<sup>2</sup> Disponibles
              </th>
              <th className={TdStyle.ThStyle}>
                Precio/m<sup>2</sup>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredElements.map(
              ({ id, nombre, unidades, m2Disponibles, preciom2 }) => (
                <tr key={id}>
                  <td className={TdStyle.TdStyle1}>{nombre}</td>
                  <td className={TdStyle.TdStyle2}>{unidades}</td>
                  <td className={TdStyle.TdStyle1}>{m2Disponibles}</td>
                  <td className={TdStyle.TdStyle2}>{preciom2}</td>
                </tr>
              )
            )}
          </tbody>
        </table>

        <p className="font-bold text-2xl mt-10 text-center md:w-1/2 mx-auto pb-10 ">
          Movimientos Realizados Por Modelo{" "}
        </p>

        <table className="w-full">
          <thead className="text-center bg-primary">
            <tr>
              <th className={TdStyle.ThStyle}>Fecha</th>
              <th className={TdStyle.ThStyle}>Tipo</th>
              <th className={TdStyle.ThStyle}>Cantidad Modificada</th>
              <th className={TdStyle.ThStyle}>m2 Totales</th>
              <th className={TdStyle.ThStyle}>Factura</th>
            </tr>
          </thead>
          <tbody>
            {movimientos.map((mov, index) => (
              <tr key={index}>
                <td className={TdStyle.TdStyle2}>
                  {formatoFecha(mov.createdAt)}
                </td>
                <td className={TdStyle.TdStyle1}>{mov.tipo}</td>
                <td className={TdStyle.TdStyle1}>{mov.cantidadCambiada}</td>
                <td className={TdStyle.TdStyle2}>
                  {Number(mov.valorRegistro).toFixed(2)}
                </td>
                <td className={TdStyle.TdStyle1}>{mov.nFactura}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);

export default TablaParaImprimirInfoModeloUnitario;
