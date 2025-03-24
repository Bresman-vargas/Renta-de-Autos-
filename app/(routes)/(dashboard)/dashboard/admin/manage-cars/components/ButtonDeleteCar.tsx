'use client'

import {Car} from "@prisma/client"
import { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"
import { Separator} from "@/components/ui/separator"
import { Button } from "@/components/ui/button";
import {Trash} from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
interface CardCarProps {
  carData: Car
}

const capitalizeFirstLetter = (str : string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


export default function ButtonDeleteCar(props : CardCarProps) {
    const {carData} = props
    const [openDialog, setOpenDialog] = useState(false);
    const router = useRouter();
    
    const handleDelete = async () => {
      try {
        const res = await fetch(`/api/car/${carData.id}`, { method: "DELETE" });
        const data = await res.json();
    
        if (data.success) {
          toast.success("Car deleted successfully!");
          router.refresh()
          setOpenDialog(false);
        } else {
          toast.error("Error deleting car");
        }
      } catch (error) {
        console.log(error)
        toast.error("Error deleting car:");
      }
    };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>   
        <DialogTrigger asChild>
            <Button variant="outline" size="sm"><Trash/>Delete</Button>
        </DialogTrigger>
        <DialogContent className="px-0">
            <DialogHeader>
              <DialogTitle className="px-5 pb-3">Delete Car</DialogTitle>
              <Separator/>
              <DialogDescription className="px-5 py-3">{`Are you sure that you want to delete ${capitalizeFirstLetter(carData.name)} type ${capitalizeFirstLetter(carData.type)}`}. <br/> This action cannot be undone.</DialogDescription>
              <Separator/>
              <DialogFooter className="px-5 pt-4 grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
                <Button variant="destructive" onClick={handleDelete} className=" hover:bg-red-900">Delete</Button>
              </DialogFooter>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}
