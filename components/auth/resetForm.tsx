"use client";

import { useForm } from "react-hook-form"
import { CardWrapper } from "./card-wrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from "../ui/form"
import * as z from "zod"
import { ResetSchema } from "../../schema/index"
import { Input } from "../ui/input"
import { Button } from "../ui/button";
import { CardError } from "./error-form";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { startTransition, useState } from "react";
import { login } from "@/actions/login";
import { useSearchParams } from "next/navigation";
import Link from "next/link";



export const ResetForm = () => {

    const [error , setError] = useState<string | undefined>("")
    const [success , setSuccess] = useState<string | undefined>("")
    const searchParams = useSearchParams()
    // const callbackUrl = searchParams.get("callbackUrl");

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: ""
        }
    })    
    const onSubmit = (values: z.infer<typeof ResetSchema>)=> {
        setError("");
        setSuccess("");
        // login(values).then((data)=>{
        //     if(data?.error){
        //         form.reset()
        //         setError(data.error)
        //     }
        //     if(data?.success){
        //         form.reset();
        //         setSuccess(data.success)
        //     }
        // }).catch(()=> setError("Something went wrong"))
        startTransition(()=> {
            login(values).then((data)=>{
                setError(data?.error);
                setSuccess(data?.success)
            })
        })
    }

    return (
        <CardWrapper headerLabel="Reset Password" backButtonLabel="Back to Login" backButtonHref="/auth/login">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="johan.eh@exmapl.com"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    {/* <CardError/> */}
                    <Button type="submit" className="w-full">Rest Password</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}