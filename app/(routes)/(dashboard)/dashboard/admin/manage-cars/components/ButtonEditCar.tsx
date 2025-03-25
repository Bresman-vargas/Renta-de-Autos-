'use client'
import { Car } from '@prisma/client'
import { useState } from 'react'
import {Pencil} from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle

} from '@/components/ui/dialog'
// import { FormEditCar } from './FormEditCar'

import { FormEditCar } from './FormEditCar/FormEditCar'
interface CardCarProps {
  carData: Car
}
export function ButtonEditCar(props: CardCarProps) {
    const {carData} = props
    console.log(carData)
    const [isOpenDialog, setIsOpenDialog] = useState(false)
  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <DialogTrigger asChild>
            <Button variant="outline" size="sm" onClick={() => setIsOpenDialog(true)}><Pencil/>Edit</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit Car</DialogTitle>
                <FormEditCar setOpenDialog={setIsOpenDialog} carData={carData}/>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}
