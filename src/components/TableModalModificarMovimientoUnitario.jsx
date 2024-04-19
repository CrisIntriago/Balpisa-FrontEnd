import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ConfirmationModal from "./ConfirmationModal";
import useActualizarMovimientoUnitario from "../hooks/useActualizarMovimientoUnitario";

const TdStyle = {
    ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-bold text-white lg:py-7 lg:px-4`,
    TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium`,
    TdStyle2: `text-dark border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-base font-medium`,
    TdButton: `inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium`,
    InputSmall: `w-full max-w-xs px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-center`,
};

const TableModalModificarMovimientoUnitario = ({ isOpen, onClose, movimientoId, numeroFactura, onUpdate }) => {
    const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const [values, setValues] = useState({
        factura: numeroFactura,
    });

    const { enviarMovActualizado } = useActualizarMovimientoUnitario();  

    const handleOpenConfirmation = () => {
        setConfirmationModalOpen(true);
    };

    const handleCloseConfirmation = () => {
        setConfirmationModalOpen(false);
    };

    const handleConfirm = async () => {
        setConfirmationModalOpen(false);
        setValues({
            factura: "",
        });
        handleSave();
    };

    useEffect(() => {
        setValues(prevValues => ({
            ...prevValues,
            factura: numeroFactura
        }));
    }, [numeroFactura, movimientoId]);

    const handleInputChange = (e, field) => {
        let { value } = e.target;

        if (field === "factura") {
            let cursorPosition = e.target.selectionStart;
            let digits = value.replace(/\D/g, '');
            if (digits.length > 15) digits = digits.substring(0, 15);
            let formattedValue = `${digits.substring(0, 3)}-${digits.substring(3, 6)}-${digits.substring(6)}`;
            formattedValue = formattedValue.padEnd(15, "0");
            setValues(prevValues => ({
                ...prevValues,
                [field]: formattedValue
            }));

            // Restablecer la posición del cursor después de actualizar el valor.
            setTimeout(() => {
                e.target.setSelectionRange(cursorPosition, cursorPosition);
            }, 0);
        } else {
            setValues(prevValues => ({
                ...prevValues,
                [field]: value
            }));
        }
    };

    const handleSave = async () => {
        const {
            factura,
        } = values;
        if (
            !factura
        ) {
            alert("Por favor, complete todos los campos antes de guardar.");
            return;
        }

        const datosMovimiento = {
            nFactura: factura,
        };

        try {
            const updatedMovimiento = await enviarMovActualizado(movimientoId, datosMovimiento);
            onUpdate(updatedMovimiento);
            onClose();
        } catch (error) {
            alert("Hubo un error al guardar el movimiento.");
            console.error(error);
        }
    };

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <>
            <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="max-w-full overflow-x-auto">
                        <p className="font-bold text-xl mt-10 text-center md:w-1/2 lg:w-1/2 mx-auto pb-10">
                            Modificar Movimiento Unitario
                        </p>
                        <table className="w-full table-fixed">
                            <thead className="text-center bg-primary">
                                <tr>
                                    <th className={`${TdStyle.ThStyle} w-[25%]`}>Factura</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {Object.keys(values).map((key) => (
                                        <td key={key} className={TdStyle.TdStyle}>
                                            <input
                                                className={TdStyle.InputSmall}
                                                type="text"
                                                name={key}
                                                value={values[key]}
                                                onChange={(e) => handleInputChange(e, key)}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-center mt-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white mx-5 py-2 px-4 rounded"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white mx-5 py-2 px-4 rounded"
                            onClick={handleOpenConfirmation}
                        >
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>

            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={handleCloseConfirmation}
                onConfirm={handleConfirm}
                header={"Confirmación de modificación"}
                message={
                    "¿Estás seguro de que deseas modificar los datos del movimiento?"
                }
            />
        </>,
        document.getElementById("modal-root")
    );
};
export default TableModalModificarMovimientoUnitario;