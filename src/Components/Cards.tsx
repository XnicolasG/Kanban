import React, { useEffect, useRef, useState } from "react"
import { Todo as TodoType } from '../types'
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { createPortal } from "react-dom";
import { Trash } from "../icons/Trash";
import { useTodoContext } from "../context/TodoContext";
import { Edit } from "../icons/Edit";
import { Modal } from "./Modal";
import { EditTodoForm } from "./EditTodoForm";

interface Props extends TodoType {
    // onRemoveTodo: ({ id }: TodoId) => void
    todo: any
}

export const Cards: React.FC<Props> = ({ id, title, completed, priority, dueDate, tags, todo }) => {
    const [isDragging, setDragging] = useState(false)
    const [preview, setPreview] = useState<HTMLElement | null>();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const cardRef = useRef(null)
    const { handleRemoveTodo, updateTodo} = useTodoContext()

    // const hanldeEditSave = ()

    useEffect(() => {
        const element = cardRef.current;
        if (!element) {
            return;
        }
        return combine(

            draggable({
                element,
                getInitialData() {
                    return todo
                },
                onDragStart() {
                    setDragging(true)
                },
                onDrop() {
                    setDragging(false);
                    setPreview(null)
                },
                onGenerateDragPreview({ nativeSetDragImage }) {
                    setCustomNativeDragPreview({
                        nativeSetDragImage,
                        render({ container }) {
                            setPreview(container)
                        }
                    })
                }
            }),
        )
    }, [id, todo])

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('text/plain', JSON.stringify(todo))
    }
    const handleSave = (updatedTodo: Partial<TodoType> & { id: string }) => {
        updateTodo(updatedTodo);  
        setIsModalOpen(false); 
    };
    return (
        <div
            ref={cardRef}
            onDragStart={handleDragStart}
            className={`bg-zinc-700/80 rounded p-2 flex flex-col w-52 md:w-64 lg:w-72 justify-between ${isDragging ? 'opacity-60 bg-gradient-to-br from-zinc-700/80 to-blue-900 transition-all duration-150' : ''}`}>
            <div className="flex flex-col gap-2 p-2">
                <article>
                    <p className="text-gray-900 bg-lime-300 max-w-20 text-center rounded-xl">{tags}</p>
                </article>

                <label className={`${completed ? 'line-through' : ''} text-xl`} >{title}</label>
                <article className="text-white flex justify-between">
                    <p className={` ${priority === 'low' ? 'text-green-400' : ''} 
                            ${priority === 'medium' ? 'text-yellow-400' : ''} 
                            ${priority === 'high' ? 'text-red-400' : ''} rounded px-1`}>{priority}</p>
                    <p className="text-slate-100/80 text-sm">{dueDate}</p>
                </article>
            </div>
            <div className="mx-auto p-1 flex w-full justify-around
            ">

                <button
                   onClick={()=> setIsModalOpen(true)}
                >
                    <Edit 
                    className="hover:text-teal-400" />
                </button>
                <button
                    className=""
                    onClick={() => handleRemoveTodo({ id })}
                >
                    <Trash className="hover:text-red-500 transition-all duration-150" />
                </button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <EditTodoForm todo={todo} onSave={handleSave} />
            </Modal>

            {preview && createPortal(<ToDoPreview title={title} />, preview)}
        </div>
    )
}

const ToDoPreview = (
    { title }: { title: string },

) => {
    return (
        <div className="w-72 rounded text-center bg-blue-700 text-white">
            <p>{title}</p>
        </div>
    )
}