
import { SearchIcon } from '../icons/SearchIcon'
import { useTodoContext } from '../context/TodoContext'

export const Search = () => {
   const { search, setSearch} = useTodoContext()
   
  return (
    <section className='flex w-1/3 px-2 bg-white rounded shadow-md transition-shadow duration-200'>
        <input
        value={search}
        onChange={e => {setSearch(e.target.value);
        }} 
        className='w-full bg-transparent outline-none ' 
        placeholder='Do the homework' />
        <SearchIcon />
    </section>
  )
}
