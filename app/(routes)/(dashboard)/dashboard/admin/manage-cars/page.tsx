import {auth} from '@clerk/nextjs/server'
import {db} from '@/lib/db'
import { redirect } from 'next/navigation'

import { ButtonAddCar } from './components/ButtonAddCar'
import { ListCars } from './ListCars'

export default async function ManageCars() {
  const {userId} = await auth()

  if(!userId){
    redirect('/')
  }

  const car = await db.car.findMany({
    where : {
      userId,
      // userId: String(userId),
    },
    orderBy : {
      createdAt : "desc"
    }
  })
  
  return (
    <div>
        <header className='flex items-center justify-between bg-card border p-4'>
            <div>
                <h1 className='text-lg font-bold'>Manage your cars</h1>
                <p className='text-muted-foreground'>Control your fleet</p>
            </div>
            <ButtonAddCar/>
        </header>

        <section className='bg-card my-4 p-4 border'>
            <ListCars cars={car}/>
        </section>
    </div>
  )
}
