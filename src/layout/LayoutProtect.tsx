import { AdminSidebar } from '@/components/sidebar/AdminSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'

function LayoutProtect() {
  return (
    <SidebarProvider>
      <main className='grid grid-cols-[auto_1fr] w-full' >
        <AdminSidebar />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

export default LayoutProtect