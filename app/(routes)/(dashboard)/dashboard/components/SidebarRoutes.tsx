'use client'
import {
  Car,
  Calendar,
  Heart,
  TextSearch,
  CalendarSearch

} from 'lucide-react'
import { SidebarItem } from './SidebarItem'
import { Logo } from '@/components/Logo'
import { Separator } from '@/components/ui/separator'
export const generalSidebarLinks = [
  {
    icon : Car,
    label : "Cars",
    href : "/dashboard"
  },
  {
    icon : Calendar,
    label : "Cars Reserves",
    href : "/dashboard/reserves"
  },
  {
    icon : Heart,
    label : "Loved Cars",
    href : "/dashboard/loved"
  }
]
export const adminSidebarLinks = [
  {
    icon : TextSearch,
    label : "Manage your cars",
    href : "/dashboard/admin/manage-cars"
  },
  {
    icon : CalendarSearch,
    label : "All reserves",
    href : "/all-reserves"
  }
]
export function SidebarRoutes() {
  const sidebarSections = [
    {title: "general" , data: generalSidebarLinks},
    {title: "admin", data: adminSidebarLinks}
  ]
  return (
    <div className='flex flex-col justify-between h-screen'>
      <div className='lg:border-r h-screen'>
        <div className="border-b border-border flex items-center pl-8 h-14 mb-2 gap-2">
          <Logo/>
          <p className='text-2xl font-semibold'>RapidRent</p>
        </div>
        {sidebarSections.map((section, index) => (
          <div key={section.title}>
            <p className='uppercase px-4 py-2 font-semibold'>{section.title}</p>
            {section.data.map((item) => (
              <SidebarItem key={item.href} item={item}/>
            ))}
            {index < sidebarSections.length -1 && <Separator/>}
          </div>
        ))}
      </div>
    </div>
  )
}
