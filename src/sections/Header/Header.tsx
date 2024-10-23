import React from 'react'
import { Tasks } from './components/Tasks'
import { DateHeader } from './components/Date'
import { Profile } from './components/Profile'

export const Header: React.FC = () => {

    return (
        <header className='bg-zinc-900 w-full text-slate-100 p-4 grid grid-cols-3 items-center'>
            <Tasks />
            <DateHeader />
            <Profile />
        </header>
    )
}
