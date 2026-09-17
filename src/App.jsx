import React from 'react'
import MainRoutes from './Routes/MainRoutes'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className='py-10 px-[10%] w-screen h-screen text-white font-semibold bg-gray-800'>
      <Navbar/>
      <MainRoutes/>
    </div>
  )
}

export default App