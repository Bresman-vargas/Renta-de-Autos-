import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(
  req: Request,
  {params}: { params: Promise<{ Car_Id: string }>}
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Resolve the context promise to get params
    const { Car_Id } = await params;
    
    const body = await req.json();
    if (typeof body.isPublished !== "boolean") {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
    
    const car = await db.car.findFirst({
      where: { id: Car_Id, userId }
    });
    
    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }
    
    const updatedCar = await db.car.update({
      where: { id: Car_Id },
      data: { isPublished: body.isPublished }
    });
    
    return NextResponse.json({ success: true, updatedCar });
  } catch (error) {
    console.error("[PATCH CAR] Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}