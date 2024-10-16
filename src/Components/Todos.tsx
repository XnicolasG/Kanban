import { Cards } from './Cards'
import { Todo as TodoType, TodoId, type ListOfTodos, TodoTitle, TodoPriority, TodoDuedate, TodoTags, TodoStatus } from '../types'
import { NewCard } from './NewCard'
import { useAutoAnimate } from '@formkit/auto-animate/react'

interface Props {
    todos: ListOfTodos
    name: string
    moveCard: any
    onRemoveTodo: ({ id }: TodoId) => void
    onAddTodo: (
        { title }: TodoTitle,
        { priority }: TodoPriority,
        { dueDate }: TodoDuedate,
        { tags }: TodoTags,
        { status }: TodoStatus) => void
}

export const Todos: React.FC<Props> = ({ todos, name, onRemoveTodo, onAddTodo, moveCard }) => {
    const [animationParent] = useAutoAnimate()

    const handleDrop = (e: React.DragEvent<HTMLUListElement>) => {
        e.preventDefault();
        const data: any = e.dataTransfer?.getData('text/plain')
        const droppedTodo = JSON.parse(data)

        moveCard(droppedTodo.id, name)
    };

    const handleDragOver = (e: React.DragEvent<HTMLUListElement>) => {
        e.preventDefault()
    }

    return (

        <section
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className='w-full bg-zinc-900 p-4 rounded-lg shadow-xl flex flex-col gap-2 items-center justify-start'>
            <h1 className='text-slate-100 font-semibold text-xl'>
                {name === 'todo' ? 'To Do' : name === 'doing' ? 'Doing' : 'Done'}
            </h1>
            <NewCard
                name={name}
                saveTodo={onAddTodo} />
            <ul
                ref={animationParent}
                className='w-full flex flex-col gap-2'
            >
                {
                    todos.filter((todo) => todo.status === name).length === 0
                        ? (

                            <h1 className='text-white text-center font-semibold'>Add a new task</h1>
                        )
                        :
                        todos.filter((todo) => todo.status === name)
                            .map((todo) => {
                                console.log(todo.title, todo.status )

                                return (
                                    <li
                                        key={todo.id}
                                        className={` text-white font-semibold w-full flex justify-around `}
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
                                            todo={todo}
                                            moveCard={moveCard}
                                        />
                                    </li>
                                )
                            }
                            )
                }
            </ul>
        </section>
    )
}
