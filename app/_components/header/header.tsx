
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { SignInWithGoogleButton, SignOutButton } from '../google-btn';
import Logo from './logo';


export default async function Header(){
      const session = await auth.api.getSession({ headers: await headers()})
      const user = session?.user
    return (
        <header className="w-full bg-white text-black border-b h-16 border-neutral-100 flex items-center">
            <div 
            style={{maxWidth: '1400px', margin: '0 auto'}}
            className="px-4 flex items-center gap-2 w-full" >
              { user ?  (
                <div className='flex items-center w-full justify-between'>
                    <div
                    style={{color: '#111111', fontSize: '14px', fontWeight: 600}}
                    >
                  {user?.email}
                    
                  </div>                    <SignOutButton />
                </div>
              ): (
                <div className='flex items-center justify-between w-full'>
                    <Logo />
                    <SignInWithGoogleButton />
                </div>
              )}
            </div>
        </header>
    )
}