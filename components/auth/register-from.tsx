"use client";

import React, { useState, useTransition } from 'react'
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from '@/schema';
import { Input } from '../ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { CardWrapper } from './card-wrapper';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { register } from '@/actions/register';



export const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            name: ""
        }
    })

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        register(values).then((data) => {
            if (data.error) {
                setError(data.error)
            }
            if (data.success) {
                setSuccess(data.success)
            }
        })
    }

    return (
        <CardWrapper
            headerLabel='Create an account'
            backButtonLabel='Already have an account'
            backButtonHref='/auth/login'
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='text'
                                            // disabled={isPending}
                                            placeholder='John Doe'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type='email' {...field} placeholder='john.doe@example.com' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' {...field} placeholder='Enter Password' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='mt-3'>
                        <FormError message={error} />
                        <FormSuccess message={success} /></div>
                    <Button type='submit' className='w-full  mt-4'>
                        Create an account
                    </Button>
                </form>
            </Form>

        </CardWrapper>
    )
}