
import React from 'react'
import { Sidebar } from '../_components/sidebar/sidebar';
import Header from '../_components/header/header';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function Layout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({ headers: await headers()})
  const user = session?.user
  return (
    <div
    style={{backgroundColor: '#fafafa'}}
    className='h-full bg-[#f5f5f5]'>
       <div className='flex h-full'>
        {user && <Sidebar />}
        <div className='flex flex-1 flex-col'>
          <Header />
          <main className='flex-1 p-6 overflow-auto'>
             {children}
          </main>
        </div>
       </div>
    </div>
  )
}

