import { ToDo } from './ToDo'
import { Todo as TodoType, TodoId, type ListOfTodos } from '../types'

interface Props {
    todos: ListOfTodos
    onComplete: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
    onRemoveTodo: ({ id }: TodoId) => void
}

export const Todos: React.FC<Props> = ({ todos, onRemoveTodo,onComplete }) => {
    return (
        <ul className='w-full bg-zinc-900 p-4 rounded-lg shadow-lg flex flex-col gap-2 items-center justify-center'>
            {
                todos.map((todo) => (
                    <li
                        key={todo.id}
                        className={`${todo.completed ? 'text-emerald-600' : 'text-white'} font-semibold w-full flex justify-around `}
                    >
                        <ToDo
                            id={todo.id}
                            title={todo.title}
                            priority={todo.priority}
                            dueDate={todo.dueDate}
                            tags={todo.tags}
                            completed={todo.completed}
                            onRemoveTodo={onRemoveTodo}
                            onComplete={onComplete}
                        />
                    </li>
                ))
            }
        </ul>
    )
}
