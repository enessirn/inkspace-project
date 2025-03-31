import React from 'react'
import PostCard from '../components/PostCard'

function Content() {
  return (
    <div className='w-full md:container md:mx-auto h-full bg-background mt-8'> 
      <div className="mx-auto py-4 flex flex-col justify-center items-center gap-4">    
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </div>
  )
}

export default Content
