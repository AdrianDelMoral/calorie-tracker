import { Activity } from "../types"

/*
    type: Una vez hayamos enviado el formulario, ejecutará el type de "save-activity"
    payload: payload: son los datos del formulario, y el "Activity" es la forma la cual tiene que tener, el tipo 
*/
export type ActivityActions = 
    { type: 'save-activity', payload: { newActivity: Activity } } | // cuando genero actividad nueva, debo generar una actividad nueva
    { type: 'set-activeId', payload: { id: Activity['id'] } } // Pero cuando voy a setear cual elemento está activo para editar, le paso solo el id

export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}

export const initialState : ActivityState = {
    activities: [], // inicia como un array vacio, y como vaya agregando el usuario, se irá rellenando
    activeId: ''
}

export const activityReducer = (
    state: ActivityState  = initialState, // El state indicamos que viene del activityState 
    action: ActivityActions  // Le asignamos el ActivyActions para las acciones(Las acciones nos van a ayudar a describir qué es lo que está pasando y qué información es la que va a modificar qué parte de nuestro state.) // Una acciçon consta de dos partes: consta de dos partes el type, que es la descripción y el payload, que es la información que modifica o que vamos a agregar a nuestro state.
) => {
    if(action.type === 'save-activity'){ // Una vez que yo mande a llamar, la acción de arriba "save-activity" va a escanear nuestro código y va a buscar ese mismo type para ejecutar ese código.
        // Este código maneja la lógica para actualizar el state

        return {
            ...state, // copia del state para asi tener todas las actividades
            activities: [ ...state.activities,action.payload.newActivity ]
        }
    }
    if (action.type == 'set-activeId') {
        return {
            ...state, // las diferentes actividades que esten se añaden
            activeId: action.payload.id
        }
    }

    return state
}