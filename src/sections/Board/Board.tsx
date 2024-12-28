import React from 'react'
import { TodoStatus } from '../../types'
import { Todos } from '../../Components/Todos'
import { Filters } from '../Filters/Filters'
import { Search } from '../../Components/Search'

export const Board: React.FC = () => {

  const columns: TodoStatus[] = [
    { status: 'todo' },
    { status: 'doing' },
    { status: 'done' }
  ];


  return (
    <section className="w-full mt-10  flex flex-col items-center justify-center">
      
      <Search />
      <Filters />
      <div className="w-full overflow-x-auto
     flex gap-4 px-8 lg:w-[90%]  items-start xl:justify-center py-8 ">
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
