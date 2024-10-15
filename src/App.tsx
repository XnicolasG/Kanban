import { useState } from "react"
import { Todos } from "./Components/Todos"
import { FilterValue, TodoDuedate, TodoId, TodoPriority, TodoTags, TodoStatus, TodoTitle, Todo as TodoType } from "./types"
import { TODO_FILTERS } from "./const"
import { mockTodos } from './data/mock.js'
import { Footer } from "./Components/Footer"


const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const columns: TodoStatus[] = [
    { status: 'todo' },
    { status: 'doing' },
    { status: 'done' }
  ];
  console.log(todos);

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
    { tags }: TodoTags,
    { status }: TodoStatus
  ): void => {

    const newTodo = {
      title,
      priority,
      dueDate,
      tags,
      id: crypto.randomUUID(),
      completed: false,
      status
    }

    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }
  return (
    <section className="bg-slate-100 h-svh flex flex-col items-center justify-center">
      <h1 className="text-2xl my-4">Take control on your tasks</h1>
      <div className="w-full flex gap-4 px-8 md:w-[80%] ">
        {
          columns.map((column) => (
            <Todos
              key={column.status}
              name={column.status}
              onComplete={hanldeCompleted}
              onRemoveTodo={handleRemove}
              todos={filteredTodos}
              onAddTodo={handleAddTodo}
            />
          ))
        }

      </div>
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        onClearCompleted={handleRemoveAllCompleted}
        filterSelected={filterSelected}
        handleFilterChange={hanldeFilterChange}
      />
    </section>
  )
}

export default App
