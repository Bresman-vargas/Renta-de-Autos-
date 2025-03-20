import { SidebarRoutes } from '@/app/(routes)/(dashboard)/dashboard/components/SidebarRoutes'
import { TopNavBar } from '@/app/(routes)/(dashboard)/dashboard/components/TopNavBar'
import { Toaster } from "@/components/ui/sonner"
import React from 'react'

export default function layout({children}: {children: React.ReactNode}) {
  return (
    <div className='flex w-full h-full '>
        <div className="w-80 h-full hidden lg:block bg-card">
          <SidebarRoutes/>
        </div>
        <div className="h-full w-full">
            <div className="bg-card">
                <TopNavBar/>
            </div>
            <div className='p-4'>
              {children}
              <Toaster expand={false}/>
            </div>
        </div>
    </div>
  )
}
