import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { supabase } from "@/lib/supabase";
// import { toast } from 'sonner';
// PATCH: Update company details
export async function PATCH(req: Request, { params }: { params: Promise<{ Car_Id: string }> }) {
    try {
      // Authenticate the user
      const { userId } = await auth();
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      // Parse the request body
      const data = await req.json();

      const { Car_Id } = await params;
  
      // Update company details
      const car = await db.car.update({
        where: { id: Car_Id, userId },
        data: {
          ...data,
        },
      });
  
      // Return the updated company details
      return NextResponse.json(car);
    } catch (error) {
      console.error("[CAR] Error:", error); // Detailed log for errors
      if (error instanceof Error) {
        return new NextResponse(error.message, { status: 500 });
      }
      return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
  req: Request, 
  { params }: { params: Promise<{ Car_Id: string }> }
) {
  try {
      const { userId } = await auth();
      if (!userId) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const { Car_Id } = await params;

      // Obtener el auto antes de eliminarlo
      const car = await db.car.findUnique({
        where: { id: Car_Id, userId }
      });

      if (!car) {
        return NextResponse.json({ error: "Car not found" }, {status: 404 });
      }

      // Eliminar la imagen si existe
      if (car.photo) {
          const imagePath = car.photo.split('/public/car/')[1] || car.photo.split('/car/')[1];

          if (imagePath) {
              const { error } = await supabase.storage.from("car").remove([imagePath]);
              if (error) console.error("Failed to delete image:", error);
          }
      }

      // Eliminar el auto de la base de datos
      const deletedCar = await db.car.delete({
          where: { id: Car_Id, userId }
      });

      return NextResponse.json({ success: true, deletedCar });

  } catch (error) {
      console.error("[DELETE CAR] Error:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}