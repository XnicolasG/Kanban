import React from 'react'
import { Filter } from './Filter'
import { FilterValue } from '../types'
interface Props {
  completedCount: number,
  filterSelected: FilterValue,
  handleFilterChange: (filter: FilterValue) => void,
  onClearCompleted: () => void
}

export const Footer: React.FC<Props> = ({
  completedCount = 0,
  filterSelected,
  handleFilterChange,
  onClearCompleted
}) => {
  return (
    <footer className='w-full flex justify-around px-3 my-2 items-center'>
      <Filter
        filterSelected={filterSelected}
        onFilterChange={handleFilterChange}
      />
      {
        completedCount > 0 && (
          <button
            onClick={ onClearCompleted}
            className='text-red-500 px-1 rounded hover:bg-red-500 hover:text-white transition-all duration-150'>
            Erase completed
          </button>
        )
      }
    </footer>
  )
}
