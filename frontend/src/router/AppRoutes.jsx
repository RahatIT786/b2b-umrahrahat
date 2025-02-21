import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from '../layout/applayout/applayout'
import Home from '../pages/Home'
import About from '../pages/About'

import BookingList from '../pages/BookingList'
import PnrList from '../pages/PnrList'

// Company Management Section



const AppRoutes = () => {
  return (
   <BrowserRouter>
        <Routes>
            <Route path="/" element={<AppLayout />}> 
                <Route index element={<Home />} />
                <Route path='/dashboard' element={<Home />} />
                <Route path="about" element={<About />} />

                {/* Company Management Routes */}
                <Route path="/booking_list" element={<BookingList />}/>
                <Route path="/pnr_list" element={<PnrList />}/> 

            </Route>
        </Routes>
   </BrowserRouter>
  )
}

export default AppRoutes