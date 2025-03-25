'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState, Dispatch, SetStateAction, useRef } from 'react'

import { MoveRight } from 'lucide-react'

import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { toast } from 'sonner'
import { CarDetailsFields } from './CarDetailsFields'
import { formSchema } from './FormSchema'
import { Car} from '@prisma/client'
// import { ImageUploader } from './ImageUploader'
// import { CarDetailsFields } from './CarDetailsFields'

// import { supabase } from '@/lib/supabase'

interface FormEditCarProps {
    setOpenDialog: Dispatch<SetStateAction<boolean>>,
    carData : Car
    // setCurrentImagePath: Dispatch<SetStateAction<string | null>>,
}

export function FormEditCar({setOpenDialog, carData}: FormEditCarProps) {
    const router = useRouter()
    // const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    // const [currentImagePath, setCurrentImagePathState] = useState<string | null>(null)
    const [, setFormSubmitted] = useState(false)
    const hasSubmittedRef = useRef(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: carData.name,
            cv: carData.cv,
            transmission: carData.transmission,
            people: carData.people,
            // photo: "",
            priceDay: carData.priceDay,
            engine: carData.engine,
            type: carData.type,
            isPublished: false
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // Set the ref immediately - this will be available in cleanup
            hasSubmittedRef.current = true
            
            await axios.patch(`/api/car/${carData.id}`, values)
            setFormSubmitted(true)
            // setCurrentImagePath(null)
            toast.success("Car update")
            setOpenDialog(false)
            router.refresh()
        } catch (error) {
            // Reset the ref if submission fails
            hasSubmittedRef.current = false
            console.log("[CAR EDIT", error)
            toast.error("Something has gone wrong")
        }
    }

    const { isValid } = form.formState

    // useEffect(() => {
    //     return () => {
    //         // Use the ref instead of the state value
    //         if (!hasSubmittedRef.current && currentImagePath) {
    //             supabase.storage
    //                 .from('car')
    //                 .remove([currentImagePath])
    //                 .then(({ error }) => {
    //                     if (error) {
    //                         toast.error("Failed to delete unused image")
    //                     } else {
    //                         toast.success("Unused image deleted successfully")
    //                     }
    //                 })
    //         }
    //     }
    // }, [currentImagePath])
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CarDetailsFields form={form} />
                    
                    {/* <ImageUploader 
                        form={form} 
                        previewUrl={previewUrl} 
                        setPreviewUrl={setPreviewUrl}
                        currentImagePath={currentImagePath}
                        setCurrentImagePath={setCurrentImagePath}
                        setCurrentImagePathState={setCurrentImagePathState}
                    /> */}
                </div>
                <div className="flex justify-end">
                    <Button className='w-full md:w-40' disabled={!isValid} type="submit">
                        <MoveRight strokeWidth={3}/>Submit
                    </Button>
                </div>
            </form>
        </Form>
    )
}