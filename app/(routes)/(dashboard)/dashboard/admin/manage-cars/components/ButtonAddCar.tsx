'use client'
import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { 
    Dialog,
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription, 
    DialogTrigger 
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { FormAddCar } from './FormAddCar/FormAddCar'

export function ButtonAddCar() {
    const [openDialog, setOpenDialog] = useState(false);
    const [, setCurrentImagePath] = useState<string | null>(null);

    return (
        <div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                    <Button variant="secondary">
                        <Plus strokeWidth={3} /> New Car
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Create a new car</DialogTitle>
                        <DialogDescription>Add a new car to your fleet</DialogDescription>
                    </DialogHeader>
                    <FormAddCar 
                        setOpenDialog={setOpenDialog} 
                        setCurrentImagePath={setCurrentImagePath}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}