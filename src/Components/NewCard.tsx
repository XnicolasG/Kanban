import React, { useRef, useState } from "react"
// import { TodoDuedate, TodoPriority, TodoStatus, TodoTags, TodoTitle } from "../types"
import { Plus } from "../icons/Plus"
import { useTodoContext } from "../context/TodoContext"

interface Props {
    name: string,
    // saveTodo: (
    //     { title }: TodoTitle,
    //     { priority }: TodoPriority,
    //     { dueDate }: TodoDuedate,
    //     { tags }: TodoTags,
    //     { status }: TodoStatus
    // ) => void
}

export const NewCard: React.FC<Props> = ({ name, }) => {
    const {handleAddTodo} = useTodoContext()
    
    const [values, setValues] = useState({
        title: '',
        priority: '',
        dueDate: '',
        tags: '',
        name: ''

    })

    const dialogRef = useRef<HTMLDialogElement>(null)
    const today = new Date().toISOString().split('T')[0];

    const handleSubmit = (e: React.KeyboardEvent<HTMLFormElement>): void => {
        e.preventDefault()
        handleAddTodo({ title: values.title }, { priority: values.priority }, { dueDate: values.dueDate }, { tags: values.tags }, { status: name })
        setValues({
            title: '',
            priority: '',
            dueDate: '',
            tags: '',
            name
        })
        closeModal()
    }
    const openModal = () => {
        dialogRef.current?.showModal()
    }
    const closeModal = () => {
        dialogRef.current?.close()
    }
    return (
        <header>
            <button
                onClick={openModal}
                className="group w-26 pr-2 font-medium  rounded  text-white bg-sky-600 hover:bg-sky-700 transition-all  duration-150">
                <p className="flex justify-between items-center gap-3">

                    <span className=" flex items-center justify-center ring-4 font-bold text-xl ring-zinc-900 bg-slate-100 rounded-full text-sky-600 group-hover:scale-110 duration-150 ">
                        <Plus />
                    </span>
                    new task
                </p>
            </button>
            <dialog className="alert-dialog p-2 rounded bg-zinc-900 w-full md:w-1/2" ref={dialogRef}>
                <button className="text-white text-xl absolute right-4 text-right hover:text-red-500 duration-150  " onClick={closeModal}>
                    {/* <Plus  /> */}
                    X
                </button>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-2 p-2">
                        <article>
                            <input
                                value={values.tags}
                                className="modalInput"
                                placeholder="task's tag"
                                onChange={(e) => setValues({ ...values, tags: e.target.value })}
                                required
                            />
                        </article>
                        <input
                            className=" px-2 modalInput"
                            value={values.title}
                            onChange={(e) => setValues({ ...values, title: e.target.value })}
                            placeholder="New Task"
                            autoFocus
                            required
                        />
                        <article className="text-white flex justify-between">

                            <select
                                onChange={(e) => setValues({ ...values, priority: e.target.value })}
                                className={`modalInput `} required>
                                <option value="" >- choose priority -</option>
                                <option className="text-green-400" value="low">Low</option>
                                <option className="text-yellow-400" value="medium">Medium</option>
                                <option className="text-red-400" value="high">High</option>
                            </select>
                            <input
                                className="modalInput"
                                onChange={(e) => setValues({ ...values, dueDate: e.target.value })}
                                type="date"
                                min={today}
                                required />
                        </article>
                        <button
                            className="w-36 mx-auto py-1 bg-sky-500 text-white rounded mt-2 hover:bg-sky-600 duration-150"
                        >create</button>
                    </div>
                </form>
            </dialog>
        </header>
    )
}
