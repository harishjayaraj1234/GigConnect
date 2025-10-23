import React from 'react'
import { useState } from 'react'
import {NavLink} from "react-router-dom"
import {assets} from "../../assets/frontend_assets/assets.js"


const Navbar = () => {

    const [visible,setVisible]= useState(false)
  return (
    <div className='flex items-center justify-between py-5 font-medium'>
        <h1 className='w-36'>GIGCONNECT</h1>
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to='/' className='flex flex-col items-center gap-1 '>
                <p>Home</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            <NavLink to='/gigs' className='flex flex-col items-center gap-1 '>
                <p>Gigs</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            <NavLink to='/wallet' className='flex flex-col items-center gap-1'>
                <p>Wallet</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                <p>Contact</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>




        </ul>
        <div className='flex items-center gap-6'>
            <img src={assets.search_icon} className='w-5 cursor-pointer' alt=''/>
            <div className='group relative'>
                <img className='w-5 cursor-pointer' src={assets.profile_icon} alt=''/>
                <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col  gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                        <p className='cursor-pointer hover:text-black'>My Profile</p>
                        <p className='cursor-pointer hover:text-black'>Bookings</p>
                        <p className='cursor-pointer hover:text-black'>Logout</p>

                    </div>
                </div>

            </div>
            <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt=''/>

        </div>
        {/* sidebar menu */}
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible?'w-full':'w-0'}`}>
            <div className='flex flex-col text-gray-600'>
                <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                    <img className='h-4 rotate-180'   src={assets.dropdown_icon} alt=''/>
                    <p>Back</p>

                </div>
                <NavLink className='py-2 pl-6 border' to='/'>Home</NavLink>
                <NavLink className='py-2 pl-6 border' to='/gigs'>Gigs</NavLink>
                <NavLink className='py-2 pl-6 border' to='/wallet'>Wallet</NavLink>
                <NavLink className='py-2 pl-6 border' to='/contact'>Contact</NavLink>


            </div>

        </div>



    </div>
  )
}

export default Navbar