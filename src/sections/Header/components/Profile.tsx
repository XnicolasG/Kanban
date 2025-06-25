import React, { useState } from 'react'
import { Edit } from '../../../icons/Edit'

type Colors = 'teal' | 'orange' | 'sky' | 'purple';

interface ProfileColors {
    color: Colors
    setColor: React.Dispatch<React.SetStateAction<Colors>>;
}

export const Profile: React.FC<ProfileColors> = ({ color, setColor }) => {
    const [showColors, setShowColor] = useState(false)

    const ringColor = {
        teal: 'ring-teal-500',
        orange: 'ring-orange-500',
        sky: 'ring-sky-500',
        purple: 'ring-purple-500',
    }[color];
    
    const textColor = {
        teal: 'hover:text-teal-500',
        orange: 'hover:text-orange-500',
        sky: 'hover:text-sky-500',
        purple: 'hover:text-purple-500',
    }[color];


    return (
        <section className='flex flex-col items-center mx-auto'>
            <a
                href='https://github.com/XnicolasG'
                target='_blank'
                className={`size-10 md:size-12 rounded-full overflow-hidden ring-4 ${ringColor} hover:shadow-xl hover:shadow-amber-200 transition-all duration-200`}>
                <img
                    title='Visit my GitHub'
                    className='cursor-pointer object-cover w-full hover:scale-125 transition-all duration-200'
                    src="https://avatars.githubusercontent.com/u/92556205?v=4" alt="XnicolasG" />
            </a>
            <article className='relative flex items-center gap-x-2'>
                <p className='text-lg'>XnicolasG</p>
                <button
                    onClick={() => {
                        setShowColor(!showColors)
                    }}
                >
                    <Edit
                        className={`cursor-pointer ${textColor} transition-all duration-150`} />
                </button>
                <section
                    
                    className={`absolute ${showColors ? 'translate-y-12 opacity-100' : '-translate-y-20 opacity-0 '}transition-all duration-300 w-full rounded-lg bg-zinc-900 ring-2 ${ringColor} text-white px-2`}>
                    Change color
                    <ul className='flex justify-around items-center py-2'>
                        <li onClick={() => {
                            setColor('teal')
                            setShowColor(false)
                        }} 
                        className='bg-teal-400 size-4 rounded-full transition-all duration-150 hover:scale-125' />
                        <li onClick={() => {
                            setColor('orange')
                            setShowColor(false)
                        }} 
                        className='bg-orange-400 size-4 rounded-full transition-all duration-150 hover:scale-125' />
                        <li onClick={() => {
                            setColor('sky')
                            setShowColor(false)
                        }} 
                        className='bg-sky-400 size-4 rounded-full transition-all duration-150 hover:scale-125' />
                        <li onClick={() => {
                            setColor('purple')
                            setShowColor(false)
                        }} 
                        className='bg-purple-400 size-4 rounded-full transition-all duration-150 hover:scale-125' />
                    </ul>
                </section>
            </article>
        </section>
    )
}
