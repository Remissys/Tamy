'use client'
import { useState } from "react"
import RegisterCard from "@/components/login/register-card"
import LoginCard from "@/components/login/login-card"


export default function Page(): JSX.Element {

    const [registrar, setRegistrar] = useState<boolean>(false)

    const changeCard = (): void => {
        setRegistrar(!registrar)
    }

    return (
        <div className="flex items-center justify-center mt-5">
            {registrar ?
                <RegisterCard 
                    changeFormMethod={changeCard}
                />
            :
                <LoginCard 
                    changeFormMethod={changeCard}
                />
            }
        </div>
    )
}