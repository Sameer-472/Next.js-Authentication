import React from 'react'
import { CardWrapper } from './card-wrapper'
import { BsExclamationTriangle } from 'react-icons/bs'


export const CardError = () => {
    return (
        <CardWrapper headerLabel='Oops something went wrong!' backButtonHref='/auth/login' backButtonLabel='Back to login'>

            <div className='w-full flex justify-center items-center'>
                <BsExclamationTriangle className='text-destructive' />
            </div>
        </CardWrapper>
    )
}
