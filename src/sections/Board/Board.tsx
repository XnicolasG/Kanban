import  React from 'react'
import { TodoStatus } from '../../types'
import { Todos } from '../../Components/Todos'
import { Footer } from '../Footer/Footer'
import { useTodoContext } from '../../context/TodoContext'

export const Board: React.FC = () => {
  const {todos} = useTodoContext()
 
  const columns: TodoStatus[] = [
    { status: 'todo' },
    { status: 'doing' },
    { status: 'done' }
  ];

  return (
    <section className="bg-slate-100 h-svh flex flex-col items-center justify-center">
    <h1 className="text-2xl my-4">Take control on your tasks ({todos.length})</h1>
    <div className="w-full flex gap-4 px-8 lg:w-[80%] items-start ">
      {
        columns.map((column) => (
          <Todos
            key={column.status}
            name={column.status}
          />
        ))
      }

    </div>
    <Footer />
  </section>
  )
}
