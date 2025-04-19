import React from 'react'
import Navbar from '../layout/Navbar'
import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';

function UnknownPage() {
  return (
    <div className='w-full h-screen bg-background dark:bg-d-bg text-primary dark:text-d-primary'>
        <Navbar />
        <div className='flex flex-col justify-center items-center'></div>
        Page not found
        <span>Please! Go to Home page</span>

        <Link to="/" className='py-1 px-4 text-center dark:text-d-primary text-primary font-bold text-3xl rounded bg-card-background dark:bg-card-d-background'>Home Page</Link>
      <Footer />
    </div>
  )
}

export default UnknownPage