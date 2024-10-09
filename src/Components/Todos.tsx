import { ToDo } from './ToDo'
import { Todo as TodoType, TodoId, type ListOfTodos, TodoTitle, TodoPriority, TodoDuedate, TodoTags } from '../types'
import { Header } from './Header'

interface Props {
    todos: ListOfTodos
    onComplete: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
    onRemoveTodo: ({ id }: TodoId) => void
    onAddTodo: (
        { title }: TodoTitle,
        { priority }: TodoPriority,
        { dueDate }: TodoDuedate,
        { tags }: TodoTags) => void
}

export const Todos: React.FC<Props> = ({ todos, onRemoveTodo,onComplete,onAddTodo }) => {
    return (

        <ul className='w-full bg-zinc-900 p-4 rounded-lg shadow-lg flex flex-col gap-2 items-center justify-center'>
            <Header saveTodo={onAddTodo} />
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
