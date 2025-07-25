import React, { useEffect, useRef, useState } from "react"
import {  Todo as TodoType } from '../types'
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { createPortal } from "react-dom";
import { Trash } from "../icons/Trash";
import { useTodoContext } from "../context/TodoContext";
import { Edit } from "../icons/Edit";
import { Modal } from "./Modal";
import { EditTodoForm } from "./EditTodoForm";
import { DeleteTodoModal } from "./DeleteTodoModal";

interface Props extends TodoType {
    todo: any
}

export const Cards: React.FC<Props> = ({ id, title, completed, priority, dueDate, tags, todo }) => {
    const [isDragging, setDragging] = useState(false)
    const [preview, setPreview] = useState<HTMLElement | null>();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalType, setModalType] = useState<'edit' | 'delete' | null>(null)
    const cardRef = useRef(null)
    const { handleRemoveTodo, updateTodo } = useTodoContext()

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
    const handleSave = async (updatedTodo: Partial<TodoType> & { id: string }) => {
        try {
            await updateTodo(updatedTodo);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error al actualizar la tarea", error)
        }
    };
    return (
        <section
            ref={cardRef}
            onDragStart={handleDragStart}
            className={`bg-zinc-700/80 cursor-pointer hover:bg-zinc-800 transition-all duration-200 rounded p-2 flex flex-col w-52 md:w-64 lg:w-72 justify-between ${isDragging ? 'opacity-60 bg-gradient-to-br from-zinc-700/80 to-blue-900 transition-all duration-150' : ''}`}>
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
                    onClick={() => {
                        setIsModalOpen(true)
                        setModalType('edit')
                    }}
                >
                    <Edit
                        className="hover:text-teal-400" />
                </button>
                <button
                    className=""
                    onClick={() => {
                        setModalType('delete')
                        setIsModalOpen(true)
                    }}
                >
                    <Trash className="hover:text-red-500 transition-all duration-150" />
                </button>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false)
                    setModalType(null)
                }}>
                {
                    modalType === 'edit'
                        ?
                        <EditTodoForm todo={todo} onSave={handleSave} />
                        :
                        (
                            <DeleteTodoModal 
                                title={title}
                                id={id}
                                handleRemoveTodo={handleRemoveTodo}
                                setIsModalOpen={setIsModalOpen}
                                setModalType={setModalType}
                            />

                        )
                }
            </Modal>

            {preview && createPortal(<ToDoPreview title={title} />, preview)}
        </section>
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