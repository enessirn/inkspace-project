import React from 'react'
import moment from "moment"
function Comment({ username, text, createdAt, pfp }) {
    return (

        <div className='w-full bg-background px-2 flex flex-row items-center border-b border-border pb-2'>
            <div className='shrink-0 flex'>
                <img
                    src={pfp}
                    alt={`${username}'s profile picture`}
                    className="w-8 h-8 rounded-full object-cover"
                />
            </div>
            <div className='flex flex-col justify-center px-4'>
                <div className='flex flex-row justify-start gap-2 items-center'>
                    <span className="font-semibold text-md">{username}</span>
                    <span className="text-secondary text-xs">{moment(createdAt).fromNow()}</span>
                </div>
                <div className='max-w-72 md:max-w-100 lg:max-w-[500px] break-words whitespace-normal '>
                    <div className="text-gray-700 mt-1 text-sm h-full break-words whitespace-normal">{text}</div>
                </div>

            </div>


        </div>
    )
}

export default Comment
