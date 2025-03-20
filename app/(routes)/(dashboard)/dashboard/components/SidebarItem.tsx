'use client'
import React from 'react'
import { LucideIcon } from 'lucide-react'
import Link from "next/link"
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
interface SidebarItemPros {
    item : {
        label : string,
        icon : LucideIcon,
        href : string
    }
}

export function SidebarItem(props : SidebarItemPros) {
    const {item} = props
    const {label, icon: Icon, href } = item
    const pathname = usePathname()
    const linkActive = pathname === href
  return (
    <Link href={href} className={clsx('flex gap-4 items-center px-4 py-3', linkActive? 'bg-primary text-primary-foreground font-semibold' : 'hover:bg-muted')}>
        <Icon className='size-5'/>
        {label}
    </Link>
  )
}
