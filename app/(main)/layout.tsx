import { getCurrentUser } from '@/actions/user.actions'
import Header from '@/components/custom/Header'
import MobileNav from '@/components/custom/MobileNav'
import Sidebar from '@/components/custom/Sidebar'
import { redirect } from 'next/navigation'
import React from 'react'

const Mainlayout = async ({children}:{children:React.ReactNode}) => {
    const currentUser = await getCurrentUser(); 
    if (!currentUser) return redirect("/sign-in");
  return (
    <main className='w-full  flex h-screen relative text-gray-200 '>
      <Sidebar {...currentUser}/>

      <section className=' flex flex-1 fixed w-[85%] right-0 flex-col'>
        <MobileNav {...currentUser}/> 
        <Header  userId={currentUser.$id} accountId={currentUser.accountId} />
      </section>

    <div className=' w-full mt-[70px]'>
        {children}
    </div>
    </main>
  )
}

export default Mainlayout
