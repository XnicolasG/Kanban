import { Cards } from './Cards'
import { Todo as TodoType, TodoId, type ListOfTodos, TodoTitle, TodoPriority, TodoDuedate, TodoTags, TodoStatus } from '../types'
import { NewCard } from './NewCard'

interface Props {
    todos: ListOfTodos
    name: string
    onComplete: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
    onRemoveTodo: ({ id }: TodoId) => void
    onAddTodo: (
        { title }: TodoTitle,
        { priority }: TodoPriority,
        { dueDate }: TodoDuedate,
        { tags }: TodoTags,
        {status} : TodoStatus) => void
}

export const Todos: React.FC<Props> = ({ todos,name, onRemoveTodo,onComplete,onAddTodo }) => {
    return (

        <ul className='w-full bg-zinc-900 p-4 rounded-lg shadow-lg flex flex-col gap-2 items-center justify-start'>
            <NewCard 
            name={name}
            saveTodo={onAddTodo} />
            {
                todos.filter((todo) => todo.status === name).map((todo) => (
                    <li
                        key={todo.id}
                        className={`${todo.completed ? 'text-emerald-600' : 'text-white'} font-semibold w-full flex justify-around `}
                    >
                        <Cards
                            id={todo.id}
                            title={todo.title}
                            priority={todo.priority}
                            dueDate={todo.dueDate}
                            tags={todo.tags}
                            status={todo.status}
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
