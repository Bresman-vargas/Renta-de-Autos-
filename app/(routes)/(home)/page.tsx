import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div>
      <Link href="/dashboard">
        <Button>Dashboard</Button>
      </Link>
    </div>
  )
}