import React, { useState } from 'react'
import { Edit } from '../../../icons/Edit'

export const Profile: React.FC = () => {
    const [showColors, setShowColor] = useState<true | false>(false)
    return (
        <section className='flex flex-col items-center mx-auto'>
            <a
                href='https://github.com/XnicolasG'
                target='_blank'
                className='size-10 md:size-12 rounded-full overflow-hidden ring-4 ring-teal-500 hover:shadow-xl hover:shadow-amber-200 transition-all duration-200'>
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
                        className='cursor-pointer hover:text-teal-400 transition-all duration-150' />
                </button>
                <section

                    className={`absolute ${showColors ? 'translate-y-10 opacity-100' : '-translate-y-20 opacity-0 '}transition-all duration-300 w-full rounded-lg bg-zinc-900 ring-2 ring-teal-400 text-white px-2`}>
                    Change color
                    <ul className='flex justify-around items-center py-1'>
                        <li className='bg-teal-400 size-4 rounded-full transition-all duration-150 hover:scale-110 active:scale-110'></li>
                        <li className='bg-orange-400 size-4 rounded-full transition-all duration-150 hover:scale-110'></li>
                        <li className='bg-sky-400 size-4 rounded-full transition-all duration-150 hover:scale-110'></li>
                        <li className='bg-purple-400 size-4 rounded-full transition-all duration-150 hover:scale-110'></li>
                    </ul>
                </section>
            </article>
        </section>
    )
}
