'use client'
import { Car } from "@prisma/client"
import Image from "next/image"
import {User, Gauge, Fuel, Wrench, Heart, CalendarArrowUp} from 'lucide-react'
import { Button } from "@/components/ui/button"
interface CardCarProps {
  car: Car;
  className?: string;
}

export function CardCar({ car, className = "" }: CardCarProps) {
    const features = [
        { label: car.transmission , icon : <Wrench className="size-4"/>},
        { label: `${car.cv} hp`, icon : <Gauge className="size-4"/> },
        { label: `${car.people} people` , icon : <User className="size-4"/>},
        { label: car.engine , icon: <Fuel className="size-4"/> },
    ];

  return (
    <article className={`${className}`}>
        <section className="bg-background flex flex-col">
            <Image 
                src={car.photo ?? "https://placehold.co/400"} 
                alt={car.name} 
                width={400} 
                height={200} 
                className="w-full h-[200px] object-cover"
            />

            <div className="flex flex-col justify-between gap-4 px-4 pb-4 border h-[250px]">
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

                <div className="flex flex-row gap-4">
                    <Button variant="outline" className="p-3"><Heart/></Button>
                    <Button variant="outline" className="w-full"><CalendarArrowUp/>Rent Car</Button>
                </div>
            </div>
        </section>
    </article>
  )
}
