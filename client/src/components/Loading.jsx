import React from 'react'
import { Skeleton } from 'antd';
function Loading() {
    return (
        <div className='w-[90%] xl:w-1/2 '>
            <Skeleton className='h-40 border-b border-gray-300 mb-4' active avatar />
            <Skeleton className='h-40 border-b border-gray-300 mb-4' active avatar />
            <Skeleton className='h-40 border-b border-gray-300 mb-4' active avatar />
            <Skeleton className='h-40 border-b border-gray-300 mb-4' active avatar />
        </div>
    )
}

export default Loading