import React from "react"
import { Todo as TodoType } from '../types'

type Props = TodoType

export const ToDo: React.FC<Props> = ({ id, title, completed }) => {

    return (
        <div className="flex w-full justify-between">
            <div className="flex gap-4">

                <input
                    className="mx-1"
                    checked={completed}
                    type="checkbox"
                    onChange={() => { }}
                />
                <label >{title}</label>
            </div>
            <button
                className="bg-red-500 font-semibold text-white px-2 rounded"
                onClick={() => { }}
            >
                Delete
            </button>
        </div>
    )
}
