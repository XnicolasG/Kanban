import {  useState } from "react"
import { Todos } from "./Components/Todos"
import { FilterValue, TodoDuedate, TodoId, TodoPriority, TodoTags, TodoStatus, TodoTitle, Todo as TodoType } from "./types"
import { TODO_FILTERS } from "./const"
import { mockTodos } from './data/mock.ts'
import { Footer } from "./Components/Footer"


const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const moveCard = (id: string, newStatus: string) => {
    // setTodos((prevStatus) => {
    //   return 
    // })
  }

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


  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const handleRemoveAllCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.LOW) return todo.priority === 'low'
    if (filterSelected === TODO_FILTERS.MEDIUM) return todo.priority === 'medium'
    if (filterSelected === TODO_FILTERS.HIGH) return todo.priority === 'high'
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
      <h1 className="text-2xl my-4">Take control on your tasks ({activeCount})</h1>
      <div className="w-full flex gap-4 px-8 md:w-[80%] items-start ">
        {
          columns.map((column) => (
            <Todos
              key={column.status}
              name={column.status}
              onRemoveTodo={handleRemove}
              todos={filteredTodos}
              onAddTodo={handleAddTodo}
              moveCard={moveCard}
            />
          ))
        }

      </div>
      <Footer
        completedCount={completedCount}
        onClearCompleted={handleRemoveAllCompleted}
        filterSelected={filterSelected}
        handleFilterChange={handleFilterChange}
      />
    </section>
  )
}

export default App
