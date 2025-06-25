import React, { useEffect, useState } from 'react'
import { Tasks } from './components/Tasks'
import { DateHeader } from './components/Date'
import { Profile } from './components/Profile'

export const Header: React.FC = () => {
    const [color, setColor] = useState<'teal' | 'orange' | 'sky' | 'purple'>(() => {
        const stored = localStorage.getItem('headerColor');
        if (stored === 'teal' || stored === 'orange' || stored === 'sky' || stored === 'purple') {
            return stored;
        }
        return 'teal';
    })

    useEffect(() => {
        if (color) {
            localStorage.setItem('headerColor', color);
        }
    }, [color]);
    return (
        <header className='bg-zinc-900 w-full text-slate-100 p-4 grid grid-cols-3 items-center'>
            <Tasks color={color} />
            <DateHeader color={color} />
            <Profile color={color} setColor={setColor} />
        </header>
    )
}
