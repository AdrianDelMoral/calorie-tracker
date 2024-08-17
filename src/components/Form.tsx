import { useState, ChangeEvent } from "react"
import { Activity } from "../types"
import { categories } from "../data/categories"

export default function Form() {

    // definiremos uno para cada tipo de form que tendremos
    /* const [category, setCategory] = useState('')
    const [activity, setActivity] = useState('')
    const [calories, setCalories] = useState('') */
    const [activity, setActivity] = useState<Activity>({
        category: 1,
        name: '',
        calories: 0,
    })

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id) // Indicará si lo que recibe es un numero o un string
        
        console.log(isNumberField);

        setActivity({
            ...activity, // escribimos los campos enteros de la actividad que no han cambiado, y se añaden
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    return (
        <form className="space-y-5 bg-gray-300 shadow p-10 rounded-lg">
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

            <input className="bg-gray-800 hover:bg-gray-900 w-full text-gray-300 p-2 border border-slate-300 rounded-lg cursor-pointer uppercase"
                type="submit"
                value='Guardar Comida o Guardar Ejercicio' />
        </form>
    )
}
