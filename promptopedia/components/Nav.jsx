"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState,useEffect, } from 'react'
import {signIn,signOut,useSession,getProviders} from 'next-auth/react'

const Nav = () => {
  const {Data: session} = useSession();
  const [providers,setProviders] = useState(null);
  const [toggleDropDown,setToggleDropDown] = useState(false);
  useEffect(()=>{
      const SetUpProviders = async () =>{
        const response = await getProviders();
        setProviders(response);
        
      }
      SetUpProviders();
  },[])
  console.log(providers);
  console.log(session);
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link href="/"className='flex flex-center gap-2'>
            <Image src="assets/images/logo.svg" alt='Promptopedia Logo' width={30} height={30} className='object-contain' />
            <p className='logo_text'>Promptopedia</p>
        </Link>
        <div className="sm:flex hidden">
          {
            
          session?(<div className='flex gap-3 md:gap-5'>
            <Link href="/create-prompt" className='black_btn'>
              Create Post
            </Link>
            <button type='button' className='outline_btn' onClick={signOut}>Sign Out</button>
            <Link href="/profile">
              <Image src={session?.user.image} alt='Profile Image' width={37} height={37} className='rounded-full'/>
            </Link>

          </div>)
         
          :<>
              {providers && Object.values(providers).map((provider)=>(
                <button type='button' className='black_btn' key={provider.name} onClick={()=>signIn(provider.id)}>Sign In</button>
              ))}
          </>
          }
        </div>
        
        <div className='sm:hidden flex relative'>
          
        {
          session?
          (<div className='flex'>
            <Image src={session?.user.image} alt='Promptopedia Logo' width={37} height={37} className='object-contain' onClick={()=>(setToggleDropDown(prev=>!prev))} />
            {toggleDropDown && (
              <div className='dropdown'>
                <Link className='dropdown_link' href='/profile' onClick={()=>setToggleDropDown(false)}>Profile</Link>
                <Link className='dropdown_link' href='/create-prompt' onClick={()=>setToggleDropDown(false)}>Create Prompt</Link>
                <button type='button' className='mt-5 w-full black_btn' onClick={()=>{setToggleDropDown(false); signOut();}}>Sign Out</button>
              </div>
            )}
          </div>)
          :<>
              {providers && Object.values(providers).map((provider)=>(
                <button type='button' className='black_btn' key={provider.name} onClick={()=>signIn(provider.id)}>Sign In</button>
              ))}
          </>
          }

        </div>
    </nav>
  )
}

export default Nav