import { CheckCircleIcon } from 'lucide-react'
import React from 'react'
import { BsExclamationTriangle } from 'react-icons/bs'

interface FormErrorProps {
    message: string | undefined
}


export const FormSuccess = ({ message }: FormErrorProps) => {
    return (
        message && (
            <div className='bg-emerald-500/15 px-2 py-2 rounded-md flex items-center gap-x-2 text-sm text-emerald'>
                <CheckCircleIcon className='h-4 w-4' />
                <p>{message}</p>
            </div>
        )
    )
}
