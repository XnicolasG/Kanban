import React from 'react'
import { useTodoContext } from '../../../context/TodoContext';

interface ProfileColor {
    color: 'teal' | 'orange' | 'sky' | 'purple';
}

export const Tasks: React.FC<ProfileColor> = ({ color }) => {
    const { todos } = useTodoContext()
    const textColor = {
        teal: 'text-teal-500',
        orange: 'text-orange-500',
        sky: 'text-sky-500',
        purple: 'text-purple-500',
    }[color];
    console.log(todos);
    const pendingTodos = todos?.filter((todo) => todo.status === 'done').length
    return (
        <article className='flex flex-col items-center'>
            <h4 className={`text-xl ${textColor} transition-all duration-200`}>Tasks</h4>
            <div className='flex text-2xl'>
                <p>
                    {pendingTodos}
                </p>
                /
                <p>
                    {todos?.length}
                </p>
            </div>
        </article>
    )
}
