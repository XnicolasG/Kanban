import React from 'react'

export const Profile: React.FC = () => {
    return (
        <section className='flex flex-col items-center mx-auto'>
            <div className='size-12 rounded-full overflow-hidden ring-4 ring-teal-500'>
                <img 
                className='object-cover w-full'
                src="https://unavatar.io/XnicolasG" alt="profile" />
            </div>
            <p className='text-lg'>XnicolasG</p>
        </section>
    )
}
