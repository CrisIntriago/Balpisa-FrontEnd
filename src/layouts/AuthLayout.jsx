import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <section className="Login flex h-screen w-full flex-wrap mx-0 px-0">
      <section className='Imagen hidden w-full h-screen md:flex md:w-1/3 md: lg:flex lg:w-1/2 overflow-hidden'>
        <div className='overflow-hidden'>
          <img src="https://res.cloudinary.com/dc6dbkutq/image/upload/v1713448617/IMAGEN_BUDA_rtdmmh.jpg" className='min-w-full min-h-full object-cover'>

          </img>

        </div>
      </section>
      <section className='shadow-2xl Login w-full h-screen md:w-2/3 lg:w-1/2  items-center justify-center'>
        <Outlet />

      </section>
    </section>
  )
}

export default AuthLayout
