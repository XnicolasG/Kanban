
import { FilterValue } from '../types'
import { FILTERS_BUTTONS } from '../const'
import { useTodoContext } from '../context/TodoContext'

// interface Props {
//   filterSelected: FilterValue
//   onFilterChange: (filter: FilterValue) => void
// }



export const Filter = () => {
  const {filterSelected,
    handleFilterChange} = useTodoContext()
  return (
    <ul className='flex justify-between w-1/2'>
      {
        Object.entries(FILTERS_BUTTONS).map(([key, { href, text }]) => {
          const isSelected = key === filterSelected;
          const className = isSelected ? 'text-sky-500 font-semibold ' : ''
          return (
            <li 
            className=' p-1 text-center hover:text-sky-500 transition-all duration-150'
            key={key}>
              <a
                href={href}
                className={className}
                onClick={(e) => {
                  e.preventDefault()
                  handleFilterChange(key as FilterValue)
                }
                }
              >
                {text}
              </a>
            </li>
          )
        })
      }
    </ul>
  )
}
