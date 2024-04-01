import React from 'react'

export default function layout({children}: Readonly<{children: React.ReactNode}>) {
  return (

        <div className='h-full flex items-center justify-center bg-sky-600'>
                {children}
        </div>
 
  )
}
