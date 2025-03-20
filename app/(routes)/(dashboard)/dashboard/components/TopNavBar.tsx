"use client"
import React, { useEffect, useState } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import { ModeToggle } from '@/components/ui/modeToggle';
import { AlignLeft } from "lucide-react"
import { SidebarRoutes } from './SidebarRoutes';
import { usePathname } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
}from "@/components/ui/sheet"

export function TopNavBar() {
  const { user } = useUser(); 
  const [isClient, setIsClient] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const parathname = usePathname()
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setIsSheetOpen(false)
  },[parathname]);

  return (
    <div className="h-14 border-b flex items-center justify-between px-4">
      <div className="flex gap-4 items-center">
        <div className="lg:hidden flex items-center">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger onClick={() => setIsSheetOpen(true)}>
              <AlignLeft/>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[300px]">
              <SheetTitle className="hidden">Title</SheetTitle>
              <SidebarRoutes/>
            </SheetContent>
          </Sheet>
        </div>

        <div className="mr-4 font-semibold">
          {isClient && user ? `Hola, ${user.firstName}` :  'Hola, Invitado'}
        </div>
      </div>
      <div className="flex gap-4">
        <ModeToggle />
        <UserButton />
      </div>
    </div>
  );
}