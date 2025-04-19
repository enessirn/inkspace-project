import React from 'react'
import Navbar from '../layout/Navbar'
import Content from '../layout/Content'
import Loading from '../components/Loading'

function Discovery() {
  return (
    <div className='dark:bg-d-bg min-h-screen bg-background'>
      <Navbar />
      <Content />
    </div>
  )
}

export default Discovery
