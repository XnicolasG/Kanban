import { useState } from "react"
import { Todos } from "./Components/Todos"

const mockTodos = [
  {
    id: '1',
    title: 'todo 1',
    completed: true
  },
  {
    id: '2',
    title: 'todo 2',
    completed: false
  },
  {
    id: '3',
    title: 'todo 3',
    completed: false
  },
]

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockTodos)
  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className="text-xl my-4">Todo mvc</h1>
      <div className="w-full md:w-1/3">
      <Todos todos={todos} />
      </div>
    </section>
  )
}

export default App
