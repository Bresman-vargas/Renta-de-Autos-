import { Car } from "@prisma/client"
import { CardCar } from "./CardCar"
interface ListCarsProps {
    cars : Car[]
}

export function ListCars({ cars }: ListCarsProps) {
    return (
      <div
        className={`${
          cars.length <= 4 ? "flex gap-4 flex-wrap" : "grid grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] gap-4"
        }`}
      >
        {cars.length > 0 ? (
          cars.map((car) => <CardCar key={car.id} car={car} />)
        ) : (
          <p className="text-center col-span-full text-gray-500">No cars available</p>
        )}
      </div>
    );
  }
