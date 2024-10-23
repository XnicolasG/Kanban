// import React from 'react'
import { Filter } from '../../Components/Filter'
// import { FilterValue } from '../../types'

// interface Props {
//   filterSelected: FilterValue,
//   handleFilterChange: (filter: FilterValue) => void,
// }

export const Filters = () => {
  return (
    <section className='w-full flex justify-around px-3 my-2 items-center'>
      <Filter />
    </section>
  )
}