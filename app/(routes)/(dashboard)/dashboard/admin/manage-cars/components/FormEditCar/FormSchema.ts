import { z } from 'zod'

export const formSchema = z.object({
    name: z.string().min(2).max(50),
    cv: z.string().max(50),
    transmission: z.string().min(2).max(50),
    people: z.string().min(1),
    // photo: z.string().min(1, ""),
    priceDay: z.string().min(2).max(50),
    engine: z.string().min(2).max(50),
    type: z.string().min(2).max(50),
    isPublished: z.boolean()
})
export type Option = { value: string; label: string}
// Option types for dropdowns
export const transmissionTypes: Option[] = [
    { value: "manual", label: "Manual" },
    { value: "automatic", label: "Automatic" },
    { value: "cvt", label: "CVT (Continuously Variable Transmission)" },
    { value: "dual_clutch", label: "Dual-Clutch" },
    { value: "semi_automatic", label: "Semi-Automatic" }
]

export const engineTypes: Option[] = [
    { value: "diesel", label: "Diesel" },
    { value: "petrol", label: "Petrol" },
    { value: "electric", label: "Electric" },
    { value: "hybrid", label: "Hybrid" },
    { value: "hydrogen fuel cell", label: "Hydrogen Fuel Cell" },
    { value: "natural gas", label: "Natural Gas" }
]

export const carTypes: Option[] = [
    { value: "suv", label: "SUV" },
    { value: "sedan", label: "Sedan" },
    { value: "hatchback", label: "Hatchback" },
    { value: "coupe", label: "Coupe" },
    { value: "convertible", label: "Convertible" },
    { value: "pickup truck", label: "Pickup Truck" },
    { value: "wagon", label: "Wagon" },
    { value: "minivan", label: "Minivan" },
    { value: "crossover", label: "Crossover" }
]

// // Image upload constants
// export const MAX_FILE_SIZE = 1 * 1024 * 1024 // 1MB
// export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]