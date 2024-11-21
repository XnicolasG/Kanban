import React from 'react'
import { TodoStatus } from '../../types'
import { Todos } from '../../Components/Todos'
import { Filters } from '../Filters/Filters'

export const Board: React.FC = () => {

  const columns: TodoStatus[] = [
    { status: 'todo' },
    { status: 'doing' },
    { status: 'done' }
  ];


  return (
    <section className=" mt-10 overflow-x-auto flex flex-col items-center justify-center">
      <Filters />
      <div className="w-full 
     flex gap-4 px-8 lg:w-[80%] md:justify-center items-start py-8 ">
        {
          columns.map((column) => (
            <Todos
              key={column.status}
              name={column.status}
            />
          ))
        }

      </div>
    </section>
  )
}
