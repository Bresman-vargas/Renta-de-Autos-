import { Car } from "@prisma/client"
import { CardCar } from "./CardCar"
interface ListCarsProps {
    cars : Car[]
}

export function ListCars({ cars }: ListCarsProps) {
    return (
      <div
        className={`${
          cars.length <= 2 ? "flex flex-row gap-4 flex-wrap justify-start" : "grid grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] gap-4"
        }`}
      >
        {cars.length > 0 ? (
          cars.map((car) => <CardCar key={car.id} car={car} className={cars.length <= 2 ? "max-md:w-full w-[320px]" : ""} />)
        ) : (
          <p className="text-center col-span-full text-gray-500">No cars available</p>
        )}
      </div>
    );
  }
