import React, { useRef, useState } from "react"
import { TodoDuedate, TodoPriority, TodoTags, TodoTitle } from "../types"

interface Props {
    saveTodo: (
        { title }: TodoTitle,
        { priority }: TodoPriority,
        { dueDate }: TodoDuedate,
        { tags }: TodoTags
    ) => void
}

export const Header: React.FC<Props> = ({ saveTodo }) => {
    const [values, setValues] = useState({
        title: '',
        priority: '',
        dueDate: '',
        tags: ''

    })
    const dialogRef = useRef<HTMLDialogElement>(null)

    const handleSubmit = (e: React.KeyboardEvent<HTMLFormElement>): void => {
        e.preventDefault()
        saveTodo({ title: values.title }, { priority: values.priority }, { dueDate: values.dueDate }, { tags: values.tags })
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
                className="w-40 font-semibold  rounded py-1 text-white bg-sky-600 hover:scale-110 transition-all duration-150">
                Create new task
            </button>
            <dialog className="alert-dialog" ref={dialogRef}>
                <button onClick={closeModal}>X</button>
                <form
                    onSubmit={handleSubmit}
                >
                    <input
                        className=""
                        value={values.title}
                        onChange={() => { }}
                        onKeyDown={() => { }}
                        placeholder="Create a new task"
                        autoFocus
                    />
                </form>
            </dialog>
        </header>
    )
}
