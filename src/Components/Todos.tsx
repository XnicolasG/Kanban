import { ToDo } from './ToDo'
import { type ListOfTodos } from '../types'

interface Props {
    todos: ListOfTodos
}

export const Todos: React.FC<Props> = ({ todos }) => {
    return (
        <ul className='w-full bg-zinc-900 p-4 rounded-lg shadow-lg flex flex-col gap-2 items-center justify-center'>
            {
                todos.map((todo) => (
                    <li
                        className={`${todo.completed ? 'text-emerald-600' : 'text-white'} font-semibold w-full flex justify-around `}
                    >
                        <ToDo
                            id={todo.id}
                            title={todo.title}
                            priority={todo.priority}
                            dueDate={todo.dueDate}
                            tags={todo.tags}
                            completed={todo.completed}
                        />
                    </li>
                ))
            }
        </ul>
    )
}
