'use client'
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Schemas
const registerSchema = z.object({
  username: z.string().min(3, "O nome de usuário deve ter pelo menos 3 caracteres"),
  email: z.email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
})

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
})

// Tipos
type RegisterFormData = z.infer<typeof registerSchema>;
type LoginFormData = z.infer<typeof loginSchema>;

export default function Page(): JSX.Element {

    const [registrar, setRegistrar] = useState<boolean>(false)

    const changeCard = (): void => {
        // Limpar Entradas de login/registro
        console.log('teste')

        setRegistrar(!registrar)
    }

    // Forms
    const registerForm = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: { username: "", email: "", password: "" },
    })

    const loginForm = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: { username: "", password: "" },
    })

    return (
        <div className="flex items-center justify-center mt-5">
            {registrar ?
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-center">Cadastro</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* 
                            Usar React Hook Forms 
                            Verficar Forms usando Zod / Verificar inputs usando Zod
                            Usar TypeScript
                        */}
                        <form>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Usuário</Label>
                                    <Input
                                        id="username"
                                        type="name"
                                        placeholder="Usuário"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="email@example.com"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input 
                                        id="password" 
                                        type="password" 
                                        placeholder="***"
                                        required
                                    />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button
                            type="submit" className="w-full"
                        >Registrar</Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => changeCard()}
                        >Login</Button>
                    </CardFooter>
                </Card>
            :
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-center">Login</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* 
                            Usar React Hook Forms 
                            Verficar Forms usando Zod / Verificar inputs usando Zod
                            Usar TypeScript
                        */}
                        <form>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Usuário</Label>
                                    <Input
                                        id="username"
                                        type="name"
                                        placeholder="Usuário"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input 
                                        id="password" 
                                        type="password" 
                                        placeholder="***"
                                        required
                                    />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button
                            type="submit" className="w-full"
                        >Login</Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => changeCard()}
                        >Registrar</Button>
                    </CardFooter>
                </Card>
            }
        </div>
    )
}