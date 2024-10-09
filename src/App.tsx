import { useState } from "react"
import { Todos } from "./Components/Todos"
import { FilterValue, TodoCompleted, TodoDuedate, TodoId, TodoPriority, TodoTags, TodoTitle, Todo as TodoType } from "./types"
import { TODO_FILTERS } from "./const"
import { Footer } from "./Components/Footer"

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
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

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

  const hanldeFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const handleRemoveAllCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  const handleAddTodo = (
    { title }: TodoTitle,
    { priority }: TodoPriority,
    { dueDate }: TodoDuedate,
    { tags }: TodoTags
  ): void => {

    const newTodo = {
      title,
      priority,
      dueDate,
      tags,
      id: crypto.randomUUID(),
      completed: false
    }

    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }
  return (
    <section className="bg-slate-100 h-svh flex flex-col items-center justify-center">
      <h1 className="text-2xl my-4">Take control on your tasks</h1>
      <div className="w-full px-8 md:w-3/4 ">
        <Todos
          onComplete={hanldeCompleted}
          onRemoveTodo={handleRemove}
          todos={filteredTodos}
          onAddTodo={handleAddTodo}
        />

        <Footer
          activeCount={activeCount}
          completedCount={completedCount}
          onClearCompleted={handleRemoveAllCompleted}
          filterSelected={filterSelected}
          handleFilterChange={hanldeFilterChange}
        />
      </div>
    </section>
  )
}

export default App
