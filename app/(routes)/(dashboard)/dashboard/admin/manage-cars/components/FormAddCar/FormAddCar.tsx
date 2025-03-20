'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState, useEffect, Dispatch, SetStateAction, useRef } from 'react'

import { MoveRight } from 'lucide-react'

import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { toast } from 'sonner'

import { formSchema } from './FormSchema'
import { ImageUploader } from './ImageUploader'
import { CarDetailsFields } from './CarDetailsFields'

import { supabase } from '@/lib/supabase'

interface FormAddCarProps {
    setOpenDialog: Dispatch<SetStateAction<boolean>>,
    setCurrentImagePath: Dispatch<SetStateAction<string | null>>,
}

export function FormAddCar(props: FormAddCarProps) {
    const { setOpenDialog, setCurrentImagePath } = props
    const router = useRouter()
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [currentImagePath, setCurrentImagePathState] = useState<string | null>(null)
    const [, setFormSubmitted] = useState(false)
    const hasSubmittedRef = useRef(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            cv: "",
            transmission: "",
            people: "",
            photo: "",
            priceDay: "",
            engine: "",
            type: "",
            isPublished: false
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // Set the ref immediately - this will be available in cleanup
            hasSubmittedRef.current = true
            
            await axios.post('/api/car', values)
            setFormSubmitted(true)
            setCurrentImagePath(null)
            toast.success("Car created")
            setOpenDialog(false)
            router.refresh()
        } catch (error) {
            // Reset the ref if submission fails
            hasSubmittedRef.current = false
            console.log("[CAR ADD", error)
            toast.error("Something has gone wrong")
        }
    }

    const { isValid } = form.formState

    useEffect(() => {
        return () => {
            // Use the ref instead of the state value
            if (!hasSubmittedRef.current && currentImagePath) {
                supabase.storage
                    .from('car')
                    .remove([currentImagePath])
                    .then(({ error }) => {
                        if (error) {
                            toast.error("Failed to delete unused image")
                        } else {
                            toast.success("Unused image deleted successfully")
                        }
                    })
            }
        }
    }, [currentImagePath])
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CarDetailsFields form={form} />
                    
                    <ImageUploader 
                        form={form} 
                        previewUrl={previewUrl} 
                        setPreviewUrl={setPreviewUrl}
                        currentImagePath={currentImagePath}
                        setCurrentImagePath={setCurrentImagePath}
                        setCurrentImagePathState={setCurrentImagePathState}
                    />
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