import {FC} from "react";
import {FormModalComponentProps} from "@/type";

const FormModalComponent:FC<FormModalComponentProps> = ({setShowModal}) => {
    return <>
        <h3 className="text-xl font-semibold text-gray-800">Crear Nueva Categoría</h3>
        <input
            type="text"
            placeholder="Nombre"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
        />
        <textarea
            placeholder="Descripción"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
        />
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select className="w-full border border-gray-300 rounded-md px-4 py-2">
                <option value="active">Activa</option>
                <option value="disabled">Deshabilitada</option>
            </select>
        </div>
        <div className="flex justify-end gap-2">
            <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700"
            >
                Cancelar
            </button>
            <button className="px-4 py-2 rounded-md bg-primary-600 hover:bg-primary-700 text-white">
                Crear
            </button>
        </div>
    </>
}

export default FormModalComponent;
