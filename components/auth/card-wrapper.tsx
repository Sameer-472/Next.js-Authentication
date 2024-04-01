import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import { BackButton } from "./back-button";
import { Header } from "./header";
import { Social } from "./social";


interface CardWrapperProps {
    children: React.ReactNode,
    headerLabel: string,
    backButtonLabel: string,
    showSocial?: boolean,
    backButtonHref: string,
}


export const CardWrapper = ({ children, headerLabel, backButtonLabel, showSocial, backButtonHref }: CardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            {
                <CardFooter>
                    <BackButton label={backButtonLabel} href={backButtonHref}/>
                </CardFooter>
            }
        </Card>
    )
}