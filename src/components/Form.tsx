import { categories } from "../data/categories"

export default function Form() {
    return (
        <form
            className="space-y-5 bg-gray-300 shadow p-10 rounded-lg"
        >
            <div className="grid grid-cols-1 gap-3">
                <label
                    htmlFor="category"
                    className="font-bold"
                >
                    Categoría:
                </label>

                <select
                    className="bg-gray-800 text-gray-300 border border-slate-300 p-2 rounded-lg w-full"
                    id="category"/* si apreto al label de arriba, se seleccionará el selector este */
                >
                    {categories.map(category => (
                        <option
                            className="bg-gray-800 text-gray-300"
                            key={category.id}
                            value={category.name}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div
                className="grid grid-cols-1 gap-3"
            >
                <label
                    htmlFor="activity"
                    className="font-bold"
                >
                    Actividad:
                </label>

                <input
                    id="activity"
                    type="text"
                    className="bg-gray-800 text-gray-300 border border-slate-300 p-2 rounded-lg w-full"
                    placeholder="Indica que Actividad has Realizado"
                />
            </div>

            <div
                className="grid grid-cols-1 gap-3"
            >
                <label htmlFor="calories"

                    className="font-bold"
                >
                    Calorias:
                </label>

                <input
                    id="calories"
                    type="number"
                    className="bg-gray-800 text-gray-300 border border-slate-300 p-2 rounded-lg w-full"
                    placeholder="Indica la Cantidad de Calorias. Ej: 300 o 500"
                />
            </div>

            <input
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 w-full text-gray-300 p-2 border border-slate-300 rounded-lg cursor-pointer uppercase"
                value='Guardar Comida o Guardar Ejercicio'
            />
        </form>
    )
}
