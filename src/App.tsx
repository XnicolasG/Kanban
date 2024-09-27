import { useState } from "react"
import { Todos } from "./Components/Todos"
import { TodoCompleted, TodoId, Todo as TodoType } from "./types"

const mockTodos = [
  {
    id: '1',
    title: 'Hacer almuerzo',
    priority: 'high',
    dueDate: '10/10/2024',
    tags: 'home',
    completed: false
  },
  {
    id: '2',
    title: 'Terminar curso',
    priority: 'medium',
    dueDate: '10/10/2024',
    tags: 'study',
    completed: false
  },
  {
    id: '3',
    title: 'Sacar a percy',
    priority: 'low',
    dueDate: '10/10/2024',
    tags: 'home',
    completed: false
  },
]

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockTodos)

  const handleRemove = ({ id }: TodoId) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }
  const hanldeCompleted = (
    { id, completed }: Pick<TodoType, 'id' | 'completed'>) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }
      return todo
    })
    setTodos(newTodos)
  }
  return (
    <section className="bg-slate-100 h-svh flex flex-col items-center justify-center">
      <h1 className="text-xl my-4">Todo mvc</h1>
      <div className="w-full md:w-1/3">
        <Todos
          onComplete={hanldeCompleted}
          onRemoveTodo={handleRemove}
          todos={todos} />
      </div>
    </section>
  )
}

export default App
