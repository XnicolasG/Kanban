import {ListOfTodos} from '../types'
import { ToDo } from './ToDo'

interface Props {
    todos: ListOfTodos
}

export const Todos: React.FC<Props> = ({todos}) => {
  return (
    <ul className='w-full p-2 flex flex-col gap-2 items-center justify-center'>
        {
            todos.map((todo) => (
                <li
                className={`${todo.completed ? 'text-emerald-600' : ''} w-full flex justify-around `}
                >
                    <ToDo 
                        id={todo.id}
                        title={todo.title}
                        completed={todo.completed}
                    />
                </li>
            ))
        }
    </ul>
  )
}
