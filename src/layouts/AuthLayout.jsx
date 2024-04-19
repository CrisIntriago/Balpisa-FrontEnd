import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <section className="Login flex h-screen w-full flex-wrap mx-0 px-0">
      <section className='Imagen hidden w-full h-screen md:flex md:w-1/2 md: lg:flex lg:w-3/5 overflow-hidden'>
        <div className='overflow-hidden w-full'>
          <img src="https://res.cloudinary.com/dc6dbkutq/image/upload/v1713459692/carrara_d2moho.jpg" className='min-w-full min-h-full object-cover'>

          </img>

        </div>
      </section>
      <section className='shadow-2xl Login w-full h-screen md:w-1/2 lg:w-2/5  items-center justify-center'>
        <Outlet />

      </section>
    </section>
  )
}

export default AuthLayout
