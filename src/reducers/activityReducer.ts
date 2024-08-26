import { Activity } from "../types"

export type ActivityActions = 
    {
        type: 'save-activity' /* Una vez hayamos enviado el formulario, ejecutará el type de "save-activity" */,
        payload: { newActivity: Activity }
    }

type ActivityState = {
    activities: Activity[]
}

export const initialState : ActivityState = {
    activities: [] // inicia como un array vacio, y como vaya agregando el usuario, se irá rellenando
}

export const activityReducer = (
    state: ActivityState  = initialState, // El state indicamos que viene del activityState 
    action: ActivityActions  // Le asignamos el ActivyActions para las acciones(Las acciones nos van a ayudar a describir qué es lo que está pasando y qué información es la que va a modificar qué parte de nuestro state.) // Una acciçon consta de dos partes: consta de dos partes el type, que es la descripción y el payload, que es la información que modifica o que vamos a agregar a nuestro state.
) => {
    if(action.type === 'save-activity'){ // Una vez que yo mande a llamar, la acción de arriba "save-activity" va a escanear nuestro código y va a buscar ese mismo type para ejecutar ese código.
        // Este código maneja la lógica para actualizar el state
        console.log('Desde el type de save-activity');
    }
}