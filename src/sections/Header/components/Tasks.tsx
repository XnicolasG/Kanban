import React from 'react'
import { useTodoContext } from '../../../context/TodoContext';

export const Tasks:React.FC = () => {
    const { todos } = useTodoContext()
    console.log(todos);
    const pendingTodos = todos?.filter((todo) => todo.status === 'done').length
  return (
    <article className='flex flex-col items-center'>
                <h4 className='text-lg'>Tasks</h4>
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
