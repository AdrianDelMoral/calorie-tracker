import { useReducer } from "react"
import Form from "./components/Form"
import { activityReducer, initialState } from "./reducers/activityReducer"

function App() {

  /* función especial que nos permite ejecutar las activityActions */
  // Toma dos valores iniciales
  const [state, dispatch] = useReducer(activityReducer, initialState)

  return (
    <>
      <header className="bg-amber-800 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Contador de Calorias
          </h1>

        </div>
      </header>

      <section className="bg-amber-700 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
            dispatch={dispatch}
          />
        </div>
      </section>
    </>
  )
}

export default App
