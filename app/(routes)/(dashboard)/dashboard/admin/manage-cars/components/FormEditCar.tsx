import { Car } from "@prisma/client"
import { useState, useEffect, useCallback } from "react"
import { CarDetailsFields } from "./FormAddCar/CarDetailsFields"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { MoveRight } from 'lucide-react'
import { z } from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema } from './FormAddCar/FormSchema'
import { ImageUploader } from './FormAddCar/ImageUploader'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'

interface FormEditCarProps {
    carData: Car
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
}

export function FormEditCar(props: FormEditCarProps) {
    const { carData, setOpenDialog } = props

    // Estados para manejar la imagen
    const [previewUrl, setPreviewUrl] = useState<string | null>(carData.photo || null)
    
    // Extraer la ruta de la imagen actual del URL completo (si existe)
    const extractImagePath = (url: string | null) => {
        if (!url) return null
        try {
            const urlObj = new URL(url)
            const pathParts = urlObj.pathname.split('/')
            // Busca la parte de la ruta después de 'car/'
            const carIndex = pathParts.findIndex(part => part === 'car')
            if (carIndex !== -1 && pathParts.length > carIndex + 1) {
                // Tomamos todo lo que viene después de 'car/'
                return pathParts.slice(carIndex + 1).join('/')
            }
            return null
        } catch (error) {
            console.error("Error extracting image path:", error)
            return null
        }
    }
    
    // Imagen original del coche
    const originalImagePath = extractImagePath(carData.photo)
    
    // Estado para la imagen actual (temporal) durante la edición
    const [currentImagePath, setCurrentImagePath] = useState<string | null>(originalImagePath)
    
    // Estado para controlar si se ha subido una nueva imagen
    const [newImageUploaded, setNewImageUploaded] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: carData.name,
            cv: carData.cv,
            transmission: carData.transmission,
            people: carData.people,
            priceDay: carData.priceDay,
            engine: carData.engine,
            type: carData.type,
            photo: carData.photo || "",
            isPublished: carData.isPublished ?? false
        }
    })
    
    const isValid = !form.formState.isSubmitting

    // Función para eliminar la imagen temporal si se cancela (con useCallback)
    const cleanupTempImage = useCallback(async () => {
        // Solo limpiar si se subió una nueva imagen y es diferente a la original
        if (newImageUploaded && currentImagePath && currentImagePath !== originalImagePath) {
            try {
                const { error } = await supabase.storage
                    .from('car')
                    .remove([currentImagePath])
                
                if (error) {
                    toast.success("Error cleaning up temporary image:")
                }
            } catch (error) {
                console.log(error)
                toast.error("Failed to clean up temporary image:")
            }
        }
    }, [currentImagePath, newImageUploaded, originalImagePath])

    // Limpieza al cerrar el diálogo
    const handleClose = async () => {
        await cleanupTempImage()
        setOpenDialog(false)
    }
    
    // Limpieza si el componente se desmonta
    useEffect(() => {
        return () => {
            cleanupTempImage()
        }
    }, [cleanupTempImage])
    
    // Función personalizada para el ImageUploader
    const handleImagePathChange = (path: string | null) => {
        setCurrentImagePath(path)
        // Marcar que se ha subido una nueva imagen si la ruta cambió
        if (path && path !== originalImagePath) {
            setNewImageUploaded(true)
        }
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // Si se envía el formulario correctamente, la imagen ya no es temporal
            setNewImageUploaded(false)
            
            // Aquí iría tu lógica para actualizar el coche en la base de datos
            // Ejemplo:
            // const response = await fetch(`/api/cars/${carData.id}`, {
            //     method: 'PUT',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(values)
            // })
            
            console.log("Datos actualizados:", values)
            toast.success("El coche ha sido actualizado correctamente")
            setOpenDialog(false)
        } catch (error) {
            console.error("Error al actualizar:", error)
            toast.error("Ha ocurrido un error al actualizar el coche")
        }
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CarDetailsFields form={form} />
                        
                        {/* <ImageUploader 
                            form={form} 
                            previewUrl={previewUrl} 
                            setPreviewUrl={setPreviewUrl}
                            currentImagePath={currentImagePath}
                            setCurrentImagePath={handleImagePathChange}
                            setCurrentImagePathState={handleImagePathChange}
                        /> */}
                        
                        {/* <CarSpecificationsFields form={form} /> */}
                    </div>
                    <div className="flex justify-between">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={handleClose} 
                            className="w-full md:w-40"
                        >
                            Cancelar
                        </Button>
                        <Button className="w-full md:w-40" disabled={!isValid} type="submit">
                            <MoveRight strokeWidth={3} className="mr-2"/>
                            Actualizar
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}