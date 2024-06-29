import React, { forwardRef } from "react";
import useMovimientosFromModeloUnitario from "../hooks/useMovimientosFromModeloUnitario";
import useModelosUnitariosCompletos from "../hooks/useModelosUnitariosCompletos";
const TdStyle = {
  ThStyle: `border-black border-2`,
  TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium`,
  TdStyle2: `text-dark border-black border-2 bg-white py-5 px-2 text-center text-base font-medium`,
};

const TablaParaImprimirInfoModeloUnitario = forwardRef(({ modeloSeleccionado, familiaSeleccionada }, ref) => {

    if (cargando) {
      return <div>Cargando Información del modelo...</div>;
    }

    if (!modeloSeleccionado) {
      return <div>No hay datos disponibles.</div>;
    }

    const { movimientos } = useMovimientosFromModeloUnitario(modeloSeleccionado, -1);

    const { modelosCompletos } =
      useModelosUnitariosCompletos(familiaSeleccionada);

    // Calcula los elementos filtrados fuera del render
    const filteredElements = useMemo(() => {
      let filtered = modelosCompletos;
      if (familiaSeleccionada !== "" && modeloSeleccionado !== "") {
        filtered = modelosCompletos.filter(
          (modelo) => modelo.id === modeloSeleccionado
        );
      }
      return filtered;
    }, [modelosCompletos, familiaSeleccionada, modeloSeleccionado]);

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
            {/* Llamada a currentElements para obtener y mapear los elementos de la página actual */}
            {filteredElements.map(
              ({ id, nombre, unidades, m2Disponibles, preciom2 }) => (
                <tr key={id}>
                  <td className={TdStyle.TdStyle}>{nombre}</td>
                  <td className={TdStyle.TdStyle2}>{unidades}</td>
                  <td className={TdStyle.TdStyle}>{m2Disponibles}</td>
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
                <td className={TdStyle.TdStyle}>{mov.tipo}</td>
                <td className={TdStyle.TdStyle}>{mov.cantidadCambiada}</td>
                <td className={TdStyle.TdStyle2}>
                  {Number(mov.valorRegistro).toFixed(2)}
                </td>
                <td className={TdStyle.TdStyle}>{mov.nFactura}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="font-bold text-2xl mt-10 text-center md:w-1/2 mx-auto pb-10 ">
          Planchas Del Modelo
        </p>

        <thead className="text-center bg-primary">
          <tr>
            <th className={TdStyle.ThStyle}>Bodega</th>
            <th className={TdStyle.ThStyle}>COD</th>
            <th className={TdStyle.ThStyle}>Alto</th>
            <th className={TdStyle.ThStyle}>Ancho</th>
            <th className={TdStyle.ThStyle}>D1A</th>
            <th className={TdStyle.ThStyle}>D1B</th>
            <th className={TdStyle.ThStyle}>D2A</th>
            <th className={TdStyle.ThStyle}>D2B</th>
            <th className={TdStyle.ThStyle}>D3A</th>
            <th className={TdStyle.ThStyle}>D3B</th>
            <th className={TdStyle.ThStyle}>
              Total m<sup>2</sup>
            </th>
          </tr>
        </thead>
        <tbody>
          {planchas.map(
            ({
              id,
              nombre,
              alto,
              ancho,
              despunte1A,
              despunte1B,
              despunte2A,
              despunte2B,
              despunte3A,
              despunte3B,
            }) => (
              <tr key={id}>
                <td className={TdStyle.TdStyle}>{bodegaSeleccionada}</td>
                <td className={TdStyle.TdStyle2}>{nombre}</td>
                <td className={TdStyle.TdStyle}>{alto}</td>
                <td className={TdStyle.TdStyle2}>{ancho}</td>
                <td className={TdStyle.TdStyle}>{despunte1A}</td>
                <td className={TdStyle.TdStyle2}>{despunte1B}</td>
                <td className={TdStyle.TdStyle}>{despunte2A}</td>
                <td className={TdStyle.TdStyle2}>{despunte2B}</td>
                <td className={TdStyle.TdStyle}>{despunte3A}</td>
                <td className={TdStyle.TdStyle2}>{despunte3B}</td>
                <td className={TdStyle.TdStyle}>
                  {(
                    alto * ancho -
                    despunte1A * despunte1B -
                    despunte2A * despunte2B -
                    despunte3A * despunte3B
                  ).toFixed(2)}
                </td>
              </tr>
            )
          )}
        </tbody>
      </div>
    );
  }
);

export default TablaParaImprimirInfoModeloUnitario;
