"use client";

import { useForm } from "react-hook-form"
import { CardWrapper } from "./card-wrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from "../ui/form"
import * as z from "zod"
import { NewPasswordSchema } from "../../schema/index"
import { Input } from "../ui/input"
import { Button } from "../ui/button";
import { CardError } from "./error-form";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { startTransition, useState } from "react";
import { login } from "@/actions/login";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { reset } from "@/actions/reset";
import { newPassword } from "@/actions/new-password";



export const NewPasswordForm = () => {

    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const searchParams = useSearchParams()

    const token = searchParams.get("token");
    // const callbackUrl = searchParams.get("callbackUrl");

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: ""
        }
    })
    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            newPassword(values , token).then((data) => {
                setError(data?.error);
                setSuccess(data?.success)
            })
        })
    }

    return (
        <CardWrapper headerLabel="Enter new Password" backButtonLabel="Back to Login" backButtonHref="/auth/login">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="*****"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    {/* <CardError/> */}
                    <Button type="submit" className="w-full">Rest Password</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}