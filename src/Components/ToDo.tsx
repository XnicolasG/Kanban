import React from "react"
import { Todo as TodoType } from '../types'

type Props = TodoType

export const ToDo: React.FC<Props> = ({ id, title, completed, priority, dueDate, tags }) => {

    return (
        <div className=" bg-zinc-700/80 rounded flex w-full justify-between">
            <div className="flex gap-4 p-4">

                <input
                    className="mx-1 hidden"
                    checked={completed}
                    type="checkbox"
                    onChange={() => { }}
                />
                <label className={`${completed ? 'line-through' : ''}`} >{title}</label>
            </div>
            <div>

                <button
                    className="hover:bg-red-500  font-semibold ring-2 ring-red-500 text-red-500 hover:text-white px-2 rounded transition-all duration-150"
                    onClick={() => { }}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}
