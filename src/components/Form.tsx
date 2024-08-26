import { useState, ChangeEvent, FormEvent, Dispatch } from "react"
import { v4 as uuidv4 } from 'uuid' // instalar uuid: "npm i uuid"

import { categories } from "../data/categories"
import { Activity } from "../types"
import { ActivityActions } from "../reducers/activityReducer"

type FormProps = {
    dispatch: Dispatch<ActivityActions> // Saber la información de qué acciones tiene el reducer que lo ha creado
}
const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0,
}

export default function Form({ dispatch }: FormProps) {

    // definiremos uno para cada tipo de form que tendremos
    const [activity, setActivity] = useState<Activity>(initialState)

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        setActivity({
            ...activity, // escribimos los campos enteros de la actividad que no han cambiado, y se añaden
            [e.target.id]: e.target.value
        })
    }

    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => { // FormEvent<HTMLFormElement> es para poder gestionar el formulario
        e.preventDefault()

        // Se evalua el form, y si pasa: manda llamar el 'save-activity'
        dispatch({ type: "save-activity", payload: { newActivity: activity } })
        // Resetear el formulario
        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }

    return (
        <form
            className="space-y-5 bg-gray-300 shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label
                    htmlFor="category"
                    className="font-bold">
                    Categoría:
                </label>

                <select
                    className="bg-gray-800 text-gray-300 border border-slate-300 p-2 rounded-lg w-full"
                    id="category" /* si apreto al label de arriba, se seleccionará el selector este */
                    value={activity.category}
                    onChange={handleChange}
                >
                    {categories.map(category => (
                        <option
                            className="bg-gray-800 text-gray-300"
                            key={category.id}
                            value={category.id} /* Para poder hacer un cambio etc, hay que tener un value que venga con un tipo también predefinido */
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label
                    htmlFor="name"
                    className="font-bold">
                    Actividad:
                </label>

                <input
                    id="name"
                    type="text"
                    className="bg-gray-800 text-gray-300 border border-slate-300 p-2 rounded-lg w-full"
                    placeholder="Indica que Actividad has Realizado"
                    value={activity.name}
                    onChange={handleChange} />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories"
                    className="font-bold">
                    Calorias:
                </label>

                <input
                    id="calories"
                    type="number"
                    className="bg-gray-800 text-gray-300 border border-slate-300 p-2 rounded-lg w-full"
                    placeholder="Indica la Cantidad de Calorias. Ej: 300 o 500"
                    value={activity.calories}
                    onChange={handleChange} />
            </div>

            <input className="bg-gray-800 hover:bg-gray-900 w-full text-gray-300 p-2 border border-slate-300 rounded-lg cursor-pointer uppercase disabled:opacity-20 disabled:cursor-default"
                type="submit"
                value={`Guardar ${activity.category == 1 ? 'Comida' : 'Ejercicio'}`}
                disabled={!isValidActivity()} />
        </form>
    )
}
