import { Activity } from "../types"

/*
    type: Una vez hayamos enviado el formulario, ejecutará el type de "save-activity"
    payload: payload: son los datos del formulario, y el "Activity" es la forma la cual tiene que tener, el tipo 
*/
export type ActivityActions = 
    { type: 'save-activity', payload: { newActivity: Activity } } | // Acción para generar una actividad nueva
    { type: 'set-activeId', payload: { id: Activity['id'] } } | // Acción para setear cual elemento está activo para editar, le paso solo el id
    { type: 'delete-activity', payload: { id: Activity['id'] } } | // Acción para eliminar la actividad
    { type: 'restart-app' }  // Acción para reiniciar la aplicación

export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}

const localStorageActivities = () : Activity[] => { // Indicamos que es un arreglo de tipo Activity
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState : ActivityState = {
    activities: localStorageActivities(), // Obtiene según la función "localStorageActivities", las actividades si ya tenemos creadas, si no creará un array vacío
    activeId: ''
}

export const activityReducer = (
    state: ActivityState  = initialState, // El state indicamos que viene del activityState 
    action: ActivityActions  // Le asignamos el ActivyActions para las acciones(Las acciones nos van a ayudar a describir qué es lo que está pasando y qué información es la que va a modificar qué parte de nuestro state.) // Una acciçon consta de dos partes: consta de dos partes el type, que es la descripción y el payload, que es la información que modifica o que vamos a agregar a nuestro state.
) => {
    if(action.type === 'save-activity'){ // Una vez que yo mande a llamar, la acción de arriba "save-activity" va a escanear nuestro código y va a buscar ese mismo type para ejecutar ese código.
        
        // Este código maneja la lógica para actualizar el state
        let updatedActivities : Activity[] = [] // generamos un state vacio, que en base a las siguientes acciones se rellena o no

        if (state.activeId) { // si tenemos algo significa que estamos editando
            // En caso de que estemos modificando, mapearemos el state de activities, y si coincide lo cambiará, y en caso contrario para no perder las demás retornaremos la actividad si no aparecerán NULL
            updatedActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity) 
        } else {
            updatedActivities = [...state.activities, action.payload.newActivity]
        }

        return {
            ...state, // copia del state para asi tener todas las actividades
            activities: updatedActivities, // actualiza con lo que tenga nuestro state en base a la acción anterior
            activeId: '' // reiniciamos el activeId cada vez que el formulario le demos al "Guardar"
        }
    }

    if (action.type === 'set-activeId') {
        return {
            ...state, // las diferentes actividades que esten se añaden
            activeId: action.payload.id
        }
    }
    
    if (action.type === 'delete-activity') {
        return {
            ...state, // creamos una copia del state
            activities: state.activities.filter(activity => activity.id !== action.payload.id) // accedemos a cada actividad con "filter", y indicamos a la que sean diferentes a la que queremos borrar con "activity.id"
        }
    }
    
    if (action.type === 'restart-app') {
        return {
            activities: [],
            activeId: ''
        }
    }

    return state
}