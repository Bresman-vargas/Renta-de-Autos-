'use client'
import { Car } from "@prisma/client"
import Image from "next/image"
import {User, Gauge, Fuel, Wrench, Trash, CircleFadingArrowUp, CircleArrowDown} from 'lucide-react'
import { Button } from "@/components/ui/button";
import { ButtonEditCar } from "./components/ButtonEditCar";
interface CardCarProps {
  car: Car
}

export function CardCar({ car }: CardCarProps) {
    const features = [
        { label: car.transmission , icon : <Wrench className="size-4"/>},
        { label: `${car.cv} hp`, icon : <Gauge className="size-4"/> },
        { label: `${car.people} people` , icon : <User className="size-4"/>},
        { label: car.engine , icon: <Fuel className="size-4"/> },
    ];
  return (
    <article className="w-full min-w-[320px]">
        <header>
            {!car.isPublished ? 
            <div className="h-5 bg-destructive text-destructive-foreground text-center flex items-center justify-center text-xs rounded-t-[0.3rem]">
                <p>Not published</p>
            </div> : 
            <div className="h-5 bg-secondary text-destructive-foreground text-center flex items-center justify-center text-xs rounded-t-[0.3.rem]">
                <p>Published</p>
            </div>
            }
        </header>
        <section className="bg-background flex flex-col">
            <Image src={car.photo ?? "https://placehold.co/400"} alt={car.name} width={400} height={200} className="w-full h-[200px] object-cover"/>

            <div className="flex flex-col justify-between h-[270px] gap-4 px-4 pb-4 border">
                <div className="flex justify-between items-center pt-4">
                    <p className="uppercase text-sm text-muted-foreground">{car.type}</p>
                    <p className="text-primary font-semibold text-xl">${car.priceDay}/day</p>
                </div>
                <h2 className="font-bold text-xl">{car.name}</h2>
                <div className="flex flex-wrap gap-2">
                    {features.map((item) => (
                        <p key={item.label} className="capitalize flex items-center gap-1 text-sm bg-muted text-muted-foreground w-fit px-2 text-nowrap rounded-full border">{item.icon}{item.label}</p>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" size="sm"><Trash/>Delete</Button>
                    <ButtonEditCar carData={car}/>
                    {!car.isPublished ? 
                    <Button variant="default" size="sm" className="col-span-2"><CircleFadingArrowUp/>Publish</Button> :
                    <Button variant="secondary" size="sm" className="col-span-2"><CircleArrowDown/>UnPublish</Button>}
                </div>
            </div>
        </section>
    </article>
  )
}
