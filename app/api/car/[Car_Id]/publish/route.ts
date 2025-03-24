import { NextResponse } from "next/server";
import { db } from "@/lib/db";  // Asegúrate de importar correctamente tu conexión a la DB
import { auth } from "@clerk/nextjs/server"; // Si usas Clerk para autenticación

export async function PATCH(
  req: Request, 
  { params }: { params: { Car_Id: string } }
) {
    try {
        const { userId } = await auth(); // Verifica si el usuario está autenticado
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { isPublished } = await req.json();

        // Buscar el auto y asegurarse de que pertenece al usuario autenticado
        const car = await db.car.findUnique({
            where: { id: params.Car_Id, userId }
        });

        if (!car) {
            return NextResponse.json({ error: "Car not found" }, { status: 404 });
        }

        // Actualizar el estado de isPublished en la base de datos
        const updatedCar = await db.car.update({
            where: { id: params.Car_Id, userId },
            data: { isPublished }
        });

        return NextResponse.json({ success: true, updatedCar });
    } catch (error) {
        console.error("[PATCH CAR] Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}