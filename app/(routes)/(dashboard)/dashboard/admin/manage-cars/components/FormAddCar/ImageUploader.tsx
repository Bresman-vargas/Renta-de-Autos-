import { UseFormReturn } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useRef, useState } from 'react'
import { ImageUp, RotateCcw, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'
import { supabase } from '@/lib/supabase'
import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES, formSchema } from './FormSchema'
import { z } from 'zod'

interface ImageUploaderProps {
    form: UseFormReturn<z.infer<typeof formSchema>>,
    previewUrl: string | null,
    setPreviewUrl: (url: string | null) => void,
    currentImagePath: string | null,
    setCurrentImagePath: (path: string | null) => void,
    setCurrentImagePathState: (path: string | null) => void
}

export function ImageUploader({ form, previewUrl, setPreviewUrl, currentImagePath, setCurrentImagePath, setCurrentImagePathState }: ImageUploaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [imageError, setImageError] = useState<string | null>(null)

    const validateFile = (file: File) => {
        if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
            setImageError("Tipo de archivo no soportado. Use JPEG, PNG o WebP.")
            return false
        }
        
        if (file.size > MAX_FILE_SIZE) {
            setImageError(`Imagen demasiado grande. El tamaño máximo es ${MAX_FILE_SIZE/1024/1024}MB.`)
            return false
        }

        return true
    }

    const deleteImage = async () => {
        if (!currentImagePath) return true

        try {
            const { error } = await supabase.storage
                .from('car')
                .remove([currentImagePath])
                
            if (error) {
                console.error("Failed to delete image:", error)
                toast.error("Failed to delete image")
                return false
            }
            return true
        } catch (error) {
            console.error("Error deleting image:", error)
            return false
        }
    }

    const resetImage = async () => {
        const success = await deleteImage()
        if (success) {
            form.setValue("photo", "")
            setPreviewUrl(null)
            setCurrentImagePath(null)
            setImageError(null)
            toast.success("Image deleted successfully")
        }
    }

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return
    
        setImageError(null)
        setIsUploading(true)
    
        try {
            if (!validateFile(file)) {
                setIsUploading(false)
                return
            }

            await deleteImage()

            const fileExt = file.name.split('.').pop()
            const fileName = `${uuidv4()}.${fileExt}`
            const filePath = `cars/${fileName}`
    
            const { error } = await supabase.storage
                .from('car')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false
                })
    
            if (error) {
                console.error("Upload failed:", error)
                toast.error(`Failed to upload image: ${error.message}`)
                return
            }
    
            const { data: urlData } = supabase.storage
                .from('car')
                .getPublicUrl(filePath, {
                    transform: {
                        width: 1200,     
                        height: 800,     
                        quality: 80, 
                    }
                })
    
            const imageUrl = urlData.publicUrl
            form.setValue("photo", imageUrl, { shouldValidate: true })
            setPreviewUrl(imageUrl)
            setCurrentImagePathState(filePath)
            setCurrentImagePath(filePath)

            toast.success("Image uploaded successfully!")
        } catch (error) {
            console.error("Error uploading file:", error)
            toast.error("Failed to upload image")
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <FormField
            control={form.control}
            name="photo"
            render={() => (
                <FormItem>
                    <FormLabel>Car Image</FormLabel>
                    <FormControl>
                        {previewUrl ? (
                            <div className="flex relative h-35">
                                <div className="flex items-center h-full">
                                    <Image  
                                        src={previewUrl} 
                                        alt="Car preview" 
                                        width={70}
                                        height={35}
                                        className="w-[100px] h-[35px] object-cover"
                                    />
                                </div>
                                <Button 
                                    variant="outline"
                                    onClick={resetImage}
                                    type="button"
                                    className="w-full border"
                                >
                                    <RotateCcw className="mr-2"/>
                                    Change Image
                                </Button>   
                            </div>
                        ) : (
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handleFileUpload}
                                    ref={fileInputRef}  
                                    className="hidden"  
                                />

                                <Button
                                    className="w-full border border-dotted"
                                    variant="outline"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isUploading}
                                >
                                    {isUploading ? "Subiendo..." : (
                                        <>
                                        <ImageUp className="mr-2"/>
                                        Subir Imagen
                                        </>
                                    )}
                                </Button>
                                
                                {imageError && (
                                    <div className="text-red-500 text-xs mt-1 flex items-center">
                                        <AlertCircle className="h-3 w-3 mr-1" />
                                        {imageError}
                                    </div>
                                )}
                                
                                <div className="text-xs text-gray-500 mt-1">
                                    Máximo {MAX_FILE_SIZE/1024/1024}MB | JPEG, PNG, WebP
                                </div>
                            </div>
                        )}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}