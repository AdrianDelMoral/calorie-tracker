import { Activity } from "../types"
/* import { categories } from "../data/categories" */
import { useMemo, Dispatch } from "react"
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline' /* Comand para instalar --> npm i @heroicons/react */
import { ActivityActions } from "../reducers/activityReducer"

type ActivityListProps = {
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>
}

export default function ActivityList({ activities, dispatch }: ActivityListProps) {

    /* const categoryName = useMemo(() => (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : ''), [activities]) */

    const isEmptyActivities = useMemo(() => activities.length === 0, [activities])

    return (
        <>
            <h2 className="text-4xl font-bold text-slate-600 text-center">
                Comida y Actividades
            </h2>


            {isEmptyActivities ?
                <p className="text-center my-5 text-slate-600 font-semibold text-xl">No hay actividades aún...</p> :
                activities.map(activity => (
                    <div key={activity.id} className={`p-5 bg-white mt-10 flex flex-row justify-between shadow-lg items-center max-w-lg mx-auto border rounded-xl
                                ${+activity.category === 1 ? 'text-lime-500' : 'text-red-500'} ${+activity.category === 1 ? 'bg-lime-200' : 'bg-red-200'}`}>
                        {/* Nombre de actividad */}
                        <p>{activity.name}</p>
                        {/* Cantidad de Calorias */}
                        <p className={`font-bold`}>
                            {activity.calories} {''}
                            <span>Calorias</span>
                        </p>

                        <div className="flex gap-14 items-center cursor-pointer">
                            <button
                                onClick={() => dispatch({ type: "set-activeId", payload: { id: activity.id } })}
                            >
                                <PencilSquareIcon
                                    className="h-6 w-6 text-lime-500"
                                />
                            </button>

                            <button
                                onClick={() => dispatch({ type: "delete-activity", payload: { id: activity.id } })}
                            >
                                <XCircleIcon
                                    className="h-6 w-6 text-red-500"
                                />
                            </button>
                        </div>
                    </div>

                ))}
        </>
    )
}
