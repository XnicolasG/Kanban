import React from 'react'
import { Tasks } from './components/Tasks'
import { DateHeader } from './components/Date'

export const Header: React.FC = () => {

    return (
        <header className='bg-zinc-900 w-full text-slate-100 px-4 py-2 grid grid-cols-3'>
            <Tasks />
            <DateHeader />
        </header>
    )
}
