import React from 'react'

function Footer() {
    const date = new Date()
    return (
        <div className='w-full '>
            <a href="https://www.linkedin.com/in/enessirn/" target='_blank' className='w-full h-28 border-b border-border dark:border-d-border py-4 flex flex-col justify-center items-center' >
                <div className='text-2xl text-primary dark:text-d-primary hover:text-blue-500'>I am Enes Şirin | {date.getFullYear()}</div>
                <div className='text-secondary dark:text-d-secondary hover:text-blue-500'>Please, Connect with me on Linkedin for feedback</div>
                <div className='text-secondary dark:text-d-secondary hover:text-blue-500'>Click to My Linkedin address</div>


            </a>
        </div>
    )
}

export default Footer