"use client";

import React from 'react'
import { Button } from '../ui/button';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

import { defaultLoginRedirect } from '@/routes';
import { signIn } from 'next-auth/react';

export const Social = () => {

  const onClick = (provider: "google" | "github")=>{
    signIn(provider , {
      callbackUrl: defaultLoginRedirect
    })
  }

  const name = "sameer";
  return (
    <div className='flex items-center w-full gap-x-2 gap-y-2'>
        <Button size={"lg"} className='w-full' variant={"outline"} onClick={()=> onClick("google")}>
                <FcGoogle className='h-5 w-5'/>
        </Button>
        <Button size={"lg"} className='w-full' variant={"outline"} onClick={()=> onClick("github")}>
            <FaGithub className='h-5 w-5'/>
        </Button>
    </div>
  )
}
