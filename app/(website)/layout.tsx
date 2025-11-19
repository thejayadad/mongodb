
import React from 'react'
import { Sidebar } from '../_components/sidebar/sidebar';

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div
    style={{backgroundColor: '#fafafa'}}
    className='h-full'>
       <div className='flex h-full'>
        <Sidebar />
        <div className='flex flex-1 flex-col'>
          <header>
            Header
          </header>
          <main className='flex-1 p-6 overflow-auto'>
             {children}
          </main>
        </div>
       </div>
    </div>
  )
}

export default layout