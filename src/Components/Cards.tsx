import React, { useEffect, useRef, useState } from "react"
import { TodoId, Todo as TodoType } from '../types'
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { createPortal } from "react-dom";

interface Props extends TodoType {
    onRemoveTodo: ({ id }: TodoId) => void
    onComplete: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void

}

export const Cards: React.FC<Props> = ({ id, title, completed, priority, dueDate, tags, onRemoveTodo, onComplete }) => {
    const [isDragging, setDragging] = useState(false)
    const [preview, setPreview] = useState<HTMLElement | null>();
    const cardRef = useRef(null)


    useEffect(() => {
        const element = cardRef.current;
        if (!element) {
            return;
        }


        return combine(

            draggable({
                element,
                getInitialData() {
                    return { id }
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
            dropTargetForElements({
                element,
                getData() {
                    return { id }
                },
                onDrop({source,self}) {
                    console.log(source.data.id, self.data.id);
                }
            })
        )
    }, [id])
    return (
        <div
            ref={cardRef}
            className={`bg-zinc-700/80 rounded p-2 flex flex-col w-full justify-between ${isDragging ? 'opacity-60 bg-gradient-to-br from-zinc-700/80 to-blue-900' : ''}`}>
            <div className="flex flex-col gap-2 p-2">
                <article>
                    <p className="text-gray-900 bg-lime-300 w-16 text-center rounded-xl">{tags}</p>
                </article>
                <input
                    className="mx-1 "
                    checked={completed}
                    type="checkbox"
                    onChange={(e) => {
                        onComplete({ id, completed: e.target.checked })
                    }}
                />

                <label className={`${completed ? 'line-through' : ''} text-xl`} >{title}</label>
                <article className="text-white flex justify-between">
                    <p className={` ${priority === 'low' ? 'text-green-400' : ''} 
                            ${priority === 'medium' ? 'text-yellow-400' : ''} 
                            ${priority === 'high' ? 'text-red-400' : ''} rounded px-1`}>{priority}</p>
                    <p className="text-slate-100/80 text-sm">{dueDate}</p>
                </article>
            </div>
            <div className="mx-auto p-1
            ">

                <button
                    className="hover:bg-red-500  font-semibold ring-2 ring-transparent hover:ring-red-600 text-red-500 hover:text-white px-2 rounded transition-all duration-150"
                    onClick={() => onRemoveTodo({ id })}
                >
                    Delete
                </button>
            </div>
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