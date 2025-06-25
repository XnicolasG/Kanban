import React from 'react'
interface ProfileColor {
    color: 'teal' | 'orange' | 'sky' | 'purple';
}
export const DateHeader: React.FC<ProfileColor> = ({ color }) => {
    const date = new Date();
    const day = date.getDate()
    const dayType: Intl.DateTimeFormatOptions = { weekday: 'short' }
    const dayName = date.toLocaleDateString('en-US', dayType);
    const monthType: Intl.DateTimeFormatOptions = { month: 'short' }
    const monthName = date.toLocaleDateString('en-US', monthType);
    console.log(dayName);

    const textColor = {
        teal: 'text-teal-500',
        orange: 'text-orange-500',
        sky: 'text-sky-500',
        purple: 'text-purple-500',
    }[color];
    
    return (
        <article className='items-center flex justify-center gap-4'>
            <div className='text-lg'>
                <p className='border-b border-slate-100'>{monthName}</p>
                <p>{dayName}</p>
            </div>
            <p className={`text-5xl ${textColor} transition-all duration-200`}>{day}</p>
        </article>
    )
}
