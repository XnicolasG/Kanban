import React from 'react'

export const DateHeader: React.FC = () => {
    const date = new Date();
    const day = date.getDate()
    const dayType: Intl.DateTimeFormatOptions = { weekday: 'short' }
    const dayName = date.toLocaleDateString('en-US', dayType);
    const monthType: Intl.DateTimeFormatOptions = { month: 'short' }
    const monthName = date.toLocaleDateString('en-US', monthType);
    console.log(dayName);

    return (
        <article className='items-center flex justify-center gap-4'>
            <div className='text-lg'>
                <p className='border-b border-slate-100'>{monthName}</p>
                <p>{dayName}</p>
            </div>
            <p className='text-4xl'>{day}</p>
        </article>
    )
}
