import React, { useState } from 'react'
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { MdLogin } from "react-icons/md";
import SearchBox from './SearchBox';
import { RouteBlogAdd, RouteIndex, RouteProfile, RouteSignIn } from '@/helpers/RouteName';
import { useDispatch, useSelector } from 'react-redux';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import usericon from '@/assets/images/user.png'

import { FaRegUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoLogOutOutline, IoSearch } from "react-icons/io5";
import { removeUser } from '@/redux/user/user.slice';
import { showToast } from '@/helpers/showToast';
import { getEnv } from '@/helpers/getEnv';
import { IoMdSearch } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { useSidebar } from './ui/sidebar';
import { useTheme } from '@/context/ThemeContext';
import { MdDarkMode, MdLightMode } from "react-icons/md";


const Topbar = () => {
  const { toggleSidebar } = useSidebar()
  const { theme, toggleTheme } = useTheme()
  const [showSearch, setShowSearch] = useState(false)
  const dispath = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)


  const handleLogout = async () => {
    try {
      const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/logout`, {
        method: 'get',
        credentials: 'include',
      })
      const data = await response.json()
      if (!response.ok) {
        return showToast('error', data.message)
      }
      dispath(removeUser())
      navigate(RouteIndex)
      showToast('success', data.message)
    } catch (error) {
      showToast('error', error.message)
    }
  }

  const toggleSearch = () => {
    setShowSearch(!showSearch)
  }

  return (
    <div className='flex justify-between items-center h-16 fixed w-full z-20 bg-background/80 backdrop-blur-xl px-5 border-b border-border/50'>
      <div className='flex justify-center items-center gap-2'>
        <button onClick={toggleSidebar} className='md:hidden p-2 rounded-lg hover:bg-muted transition-colors' type='button'>
          <AiOutlineMenu className='size-5' />
        </button>
        <Link to={RouteIndex} className='flex items-center gap-2 group'>
          <span className='text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-1.5 rounded-xl tracking-tight shadow-sm'>PkBlog</span>
        </Link>
      </div>
      <div className='w-[500px]'>
        <div className={`md:relative md:block absolute bg-background left-0 w-full md:top-0 top-16 md:p-0 p-5 ${showSearch ? 'block' : 'hidden'}`}>
          <SearchBox />
        </div>
      </div>
      <div className='flex items-center gap-3'>
        <button onClick={toggleTheme} type='button' className='p-2 rounded-lg hover:bg-muted transition-colors' aria-label='Toggle theme'>
          {theme === 'dark' ? <MdLightMode className='size-5' /> : <MdDarkMode className='size-5' />}
        </button>
        <button onClick={toggleSearch} type='button' className='md:hidden block p-2 rounded-lg hover:bg-muted'>
          <IoMdSearch size={25} />
        </button>

        {!user.isLoggedIn ?
          <Button asChild className="rounded-full shadow-md hover:shadow-lg transition-shadow">
            <Link to={RouteSignIn}  >
              <MdLogin />
              Sign In
            </Link>
          </Button>
          :
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user.user?.avatar || usericon} />
              </Avatar>

            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <p>{user.user?.name}</p>
                <p className='text-sm'>{user.user?.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to={RouteProfile}>
                  <FaRegUser />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to={RouteBlogAdd}>
                  <FaPlus />
                  Create Blog
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                <IoLogOutOutline color='red' />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        }


      </div>



    </div >
  )
}

export default Topbar