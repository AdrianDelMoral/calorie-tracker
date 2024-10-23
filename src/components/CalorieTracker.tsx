import { useMemo } from 'react'
import type { Activity } from '../types'
import CalorieDisplay from './CalorieDisplay'

type CalorieTrackerProps = {
    activities: Activity[]
}

export default function CalorieTracker({ activities }: CalorieTrackerProps) {

    // Contadores
    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities])

    const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities])

    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [activities])

    return (
        <>
            <h2 className='text-3xl font-black text-green-600 text-start my-10'>Resumen de Calorias</h2>
            <div className='grid items-center gap-3 divide-y divide-green-500/50'>
                <CalorieDisplay
                    text="Calorias Consumidas"
                    calories={caloriesConsumed}
                />

                <CalorieDisplay
                    text="Calorias Quemadas"
                    calories={caloriesBurned}
                />

                <CalorieDisplay
                    text="Deficit Calorico"
                    calories={netCalories}
                />
            </div>
        </>
    )
}

