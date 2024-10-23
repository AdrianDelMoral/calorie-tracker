import { useEffect, useMemo, useReducer } from "react"
import Form from "./components/Form"
import { activityReducer, initialState } from "./reducers/activityReducer"
import { ArrowPathIcon } from '@heroicons/react/24/outline' /* Comand para instalar --> npm i @heroicons/react */
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";

function App() {

  /* función especial que nos permite ejecutar las activityActions */
  // Toma dos valores iniciales
  const [state, dispatch] = useReducer(activityReducer, initialState) // dispatch: mandar a llamar las acciones, y state siempre retorna el estado del reducer(Formulario)

  // Se almacena en el localstorage el item 'activities', que tenemos en el ActivityList y lo hace JSON.stringify
  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const canRestartApp = () => useMemo(() => state.activities.length, [state.activities])

  return (
    <>
      <header className="bg-lime-800 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-5">
            <img src="./calories-calculator.png" alt="" className="w-8 h-8" />

            <h1 className="text-center text-lg font-bold text-white uppercase">
              Contador de Calorias
            </h1>
          </div>

          <button
            className="flex items-center space-x-4 text-white font-bold rounded-3xl px-3 py-2 hover:bg-teal-700 hover:text-white hover:transition-all disabled:opacity-10"
            disabled={!canRestartApp()}
            onClick={() => dispatch({ type: "restart-app" })}
          >
            <ArrowPathIcon
              className="h-6 w-6"
            />
            <p>Reset App</p>
          </button>
        </div>
      </header>

      <section className="py-20 mx-auto">
        <div className="mx-auto max-w-6xl grid grid-cols-2 gap-20">
          <Form
            dispatch={dispatch}
            state={state}
          />

          <div className='w-full'>
            <CalorieTracker
              activities={state.activities}
            />
          </div>
        </div>
      </section>



      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>
    </>
  )
}

export default App
