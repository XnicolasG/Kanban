import React from "react"
import { TodoId, Todo as TodoType } from '../types'

interface Props extends TodoType {
    onRemoveTodo: ({ id }: TodoId) => void
    onComplete: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void

}

export const ToDo: React.FC<Props> = ({ id, title, completed, priority, dueDate, tags, onRemoveTodo, onComplete }) => {

    return (
        <div className=" bg-zinc-700/80 rounded p-2 flex flex-col w-full justify-between">
            <div className="flex flex-col gap-2 p-2">
                <article>
                    <p className="text-gray-900 bg-lime-300 w-16 text-center rounded-xl">{tags}</p>
                </article>
                <input
                    className="mx-1 "
                    checked={completed}
                    type="checkbox"
                    onChange={(e) => {
                        onComplete({id,completed:e.target.checked})
                     }}
                />
                <label className={`${completed ? 'line-through' : ''} text-xl`} >{title}</label>
                <article className="text-white flex justify-between">
                    <p className={` ${priority === 'low' ? 'text-green-400' : ''} 
                            ${priority === 'medium' ? 'text-yellow-400' : ''} 
                            ${priority === 'high' ? 'text-red-400' : ''} rounded px-1`}>{priority}</p>
                    <p className="text-slate-100/80">{dueDate}</p>
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
        </div>
    )
}
