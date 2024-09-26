import { useState } from "react"
import { Todos } from "./Components/Todos"

const mockTodos = [
  {
    id: '1',
    title: 'todo 1',
    priority: 'low',
    dueDate : '10/10/24',
    tags: 'home',
    completed: true
  },
  {
    id: '2',
    title: 'todo 2',
    priority: 'low',
    dueDate : '10/10/24',
    tags: 'home',
    completed: false
  },
  {
    id: '3',
    title: 'todo 3',
    priority: 'low',
    dueDate : '10/10/24',
    tags: 'home',
    completed: false
  },
]

const App = (): JSX.Element => {
  const [todos] = useState(mockTodos)
  return (
    <section className="bg-zinc-900 h-svh flex flex-col items-center justify-center">
      <h1 className="text-xl my-4">Todo mvc</h1>
      <div className="w-full md:w-1/3">
      <Todos todos={todos} />
      </div>
    </section>
  )
}

export default App
