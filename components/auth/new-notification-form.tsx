"use client";

import { useSearchParams } from "next/navigation";
import { CardWrapper } from "./card-wrapper";
import { BeatLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";

export const NewVerificationForm = () => {

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>()
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (!token) {
            setError("Missing token");
        };
        newVerification(token).then((data) => {
            setSuccess(data.success);
            setError(data.error);
        }).catch(() => {
            setError("Something went wrong")
        })
    }, [token]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit])

    return (
        <CardWrapper headerLabel="Confirming you verification" backButtonLabel="Back to Login" backButtonHref="/auth/login">
            <div className="flex items-center w-full justify-center">
                <BeatLoader />
            </div>
        </CardWrapper>
    )
}