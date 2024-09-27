import { useState } from "react"
import { Todos } from "./Components/Todos"

const mockTodos = [
  {
    id: '1',
    title: 'Hacer almuerzo',
    priority: 'high',
    dueDate : '10/10/2024',
    tags: 'home',
    completed: true
  },
  {
    id: '2',
    title: 'Terminar curso',
    priority: 'medium',
    dueDate : '10/10/2024',
    tags: 'study',
    completed: false
  },
  {
    id: '3',
    title: 'Sacar a percy',
    priority: 'low',
    dueDate : '10/10/2024',
    tags: 'home',
    completed: false
  },
]

const App = (): JSX.Element => {
  const [todos] = useState(mockTodos)
  return (
    <section className="bg-slate-100 h-svh flex flex-col items-center justify-center">
      <h1 className="text-xl my-4">Todo mvc</h1>
      <div className="w-full md:w-1/3">
      <Todos todos={todos} />
      </div>
    </section>
  )
}

export default App
