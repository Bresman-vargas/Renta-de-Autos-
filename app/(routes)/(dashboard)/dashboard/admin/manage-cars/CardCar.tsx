'use client'
import { Car } from "@prisma/client"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {User, Gauge, Fuel, Wrench, CircleFadingArrowUp, CircleArrowDown} from 'lucide-react'
import { Button } from "@/components/ui/button";
import { ButtonEditCar } from "./components/ButtonEditCar";
import ButtonDeleteCar from "./components/ButtonDeleteCar";
interface CardCarProps {
  car: Car;
  className?: string;
}

export function CardCar({ car, className = "" }: CardCarProps) {
    const [isPublished, setIsPublished] = useState(car.isPublished);
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const features = [
        { label: car.transmission , icon : <Wrench className="size-4"/>},
        { label: `${car.cv} hp`, icon : <Gauge className="size-4"/> },
        { label: `${car.people} people` , icon : <User className="size-4"/>},
        { label: car.engine , icon: <Fuel className="size-4"/> },
    ];

    const togglePublish = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/car/${car.id}/publish`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isPublished: !isPublished }),
            });
            if (!res.ok) throw new Error("Failed to update publish status");
            router.refresh()
            setIsPublished(!isPublished);
        } catch (error) {
            console.error("Error updating publish status:", error);
        } finally {
            setLoading(false);
        }
    };

  return (
    <article className={`${className}`}>
        <header>
            {!car.isPublished ? 
            <div className="h-5 bg-destructive text-destructive-foreground text-center flex items-center justify-center text-xs rounded-t-lg">
                <p>Not published</p>
            </div> : 
            <div className="h-5 bg-secondary text-secondary-foreground text-center flex items-center justify-center text-xs rounded-t-lg">
                <p>Published</p>
            </div>
            }
        </header>
        <section className="bg-background flex flex-col">
            <Image 
                src={car.photo ?? "https://placehold.co/400"} 
                alt={car.name} 
                width={400} 
                height={200} 
                className="w-full h-[200px] object-cover"
            />

            <div className="flex flex-col justify-between gap-4 px-4 pb-4 border h-[300px]">
                <div className="flex justify-between items-center pt-4">
                    <p className="uppercase text-sm text-muted-foreground">{car.type}</p>
                    <p className="text-primary font-semibold text-xl">${car.priceDay}/day</p>
                </div>
                <h2 className="font-bold text-xl">{car.name}</h2>
                <div className="flex flex-wrap gap-2">
                    {features.map((item) => (
                        <p key={item.label} className="capitalize flex items-center gap-1 text-sm bg-muted text-muted-foreground w-fit px-2 text-nowrap rounded border">{item.icon}{item.label}</p>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <ButtonDeleteCar carData={car}/>
                    <ButtonEditCar carData={car}/>
                    <Button 
                        variant={isPublished ? "secondary" : "default"} 
                        size="sm" 
                        className={isPublished ? "border border-border col-span-2" : "col-span-2"}
                        onClick={togglePublish}
                        disabled={loading}
                    >
                        {loading ? "Updating..." : isPublished ? <><CircleArrowDown/> Unpublish</> : <><CircleFadingArrowUp/> Publish</>}
                    </Button>
                </div>
            </div>
        </section>
    </article>
  )
}
