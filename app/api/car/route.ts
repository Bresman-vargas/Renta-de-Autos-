import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(red: Request){
    try {
        const {userId} = await auth()
        if(!userId){
            return new NextResponse("Unantorized", {status: 401})
        }

        const data = await red.json()
        console.log("Datos recibidos:", data);

        const car = await db.car.create({
            data: {
                userId,
                ...data
            }
        })

        return NextResponse.json(car)
    } catch (error) {
        console.log("[CAR ADD API]" , error)
        return new NextResponse("Internal Error" , {status: 500})
    }
}