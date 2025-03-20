'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
export function Logo() {
    const router = useRouter()
  return (
    <div onClick={()=> router.push("/")} className='cursor-pointer flex items-center justify-center'>
        <Image src="/logo.svg" alt='Logo'  width="55" height="10" />
    </div>
  )
}
