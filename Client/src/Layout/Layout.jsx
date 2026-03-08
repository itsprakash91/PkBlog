import AppSidebar from '@/components/AppSidebar'
import Footer from '@/components/Footer'
import Topbar from '@/components/Topbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    // topbar
    // sidebar
    <SidebarProvider>
      <Topbar />
      <AppSidebar />
      <main className='w-full bg-background bg-mesh'>
        <div className='w-full min-h-[calc(100vh-60px)] py-28 px-6 md:px-12 max-w-7xl mx-auto'>
          <Outlet />
        </div>
        {/* footer */}
        <Footer />
      </main>
    </SidebarProvider>
  )
}

export default Layout