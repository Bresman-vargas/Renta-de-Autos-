import {auth} from '@clerk/nextjs/server'
import {db} from '@/lib/db'
import { redirect } from 'next/navigation'
import { ListCars } from './ListCars'

export default async function Home() {
  const {userId} = await auth()

  if(!userId){
    redirect("/")
  }

  const car = await db.car.findMany({
    where : {
      userId,
      isPublished: true,
    },
    orderBy : {
      updatedAt : "desc"
    }
  })
  return (
    <div>
      <header>
        <h1 className='font-semibold text-xl'>List of cars</h1>
      </header>
      <p className='text-muted-foreground'>Here you can find rental cars available to speak to</p>

      <section className='bg-card my-4 p-4 border'>
        <ListCars cars={car}/>
      </section>
    </div>
  )
}
