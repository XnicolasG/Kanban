import { Cards } from './Cards'
import { NewCard } from './NewCard'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useTodoContext } from '../context/TodoContext'
import { useTodos } from '../context/Hooks/useTodos'

interface Props {
    name: string
}

export const Todos: React.FC<Props> = ({ name, }) => {
    const {
        filteredTodos,
        moveCard,
        loading
    } = useTodoContext()
    const { updateTodo } = useTodos()
    console.log(filteredTodos);

    const [animationParent] = useAutoAnimate()

    const handleDrop = (e: React.DragEvent<HTMLUListElement>) => {
        e.preventDefault();
        const data: string = e.dataTransfer?.getData('text/plain')
        const droppedTodo = JSON.parse(data)
        moveCard(droppedTodo.id, name)
        updateTodo({id:droppedTodo.id, status:name})
    };

    const handleDragOver = (e: React.DragEvent<HTMLUListElement>) => {
        e.preventDefault()
    }

    return (

        <section
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={`w-64 md:w-96 ${name === 'todo' ? 'bg-gradient-to-b from-zinc-900 via-zinc-900 to-indigo-600/60 border-t-2 border-indigo-600 ' : name === 'doing' ? 'bg-gradient-to-b from-zinc-900 via-zinc-900  to-amber-400/60 border-t-2 border-amber-600' : 'bg-gradient-to-b from-zinc-900  via-zinc-900 to-emerald-600/60 border-t-2 border-emerald-600'}
             bg-zinc-900 p-4 rounded-lg shadow-xl flex flex-col gap-2 items-center justify-start`}>
            <h1 className='text-slate-100 font-semibold text-xl'>
                {name === 'todo' ? 'To Do' : name === 'doing' ? 'Doing' : 'Done'}
            </h1>
            <NewCard
                name={name}
            />
            <ul
                ref={animationParent}
                className='w-64 md:w-96 flex flex-col gap-2'
            >
                {
                    filteredTodos.filter((todo) => todo.status === name).length === 0
                        ? (

                            <h1 className='text-white text-center font-semibold'>{loading ? 'Loading ...' : 'Add a new task'} </h1>
                        )
                        :
                        filteredTodos.filter((todo) => todo.status === name)
                            .map((todo) => {
                                console.log(todo.title, todo.status)

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
                                            todo={todo}
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
