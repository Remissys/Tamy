'use client'
import { useState } from "react"
import { useForm } from "react-hook-form"
import { email, z } from 'zod'
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
import { request } from "@/api/client"


const RegisterCard = (
    { changeFormMethod }: { changeFormMethod: () => void }
) => {
    const registerForm = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: { username: "", email: "", password: "" },
    })

    const submitForm = async (data: RegisterFormData) => {
        console.log(data)
        const requestConfig = {
            url: `login`,
            method: 'POST',
            body: {
                username: data.username,
                email: data.email,
                password: data.password,
            }
        }

        const requestResponse = await request(requestConfig)

        if(requestResponse.success) {
            // Lógica para lidar com o login bem-sucedido
        } else {
            alert('Erro ao registrar usuário')
        }


        console.log(requestResponse)
    }

    return (
        <Card className="w-full max-w-sm">
            <form onSubmit={registerForm.handleSubmit(submitForm)}>
                <CardHeader>
                    <CardTitle className="text-center">Cadastro</CardTitle>
                </CardHeader>
                <CardContent>
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
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button
                        type="submit" className="w-full"
                        >Registrar</Button>
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={changeFormMethod}
                        >Login</Button>
                </CardFooter>
            </form>
        </Card>
    )
}

type RegisterFormData = z.infer<typeof registerSchema>;
const registerSchema = z.object({
    username: z.string().min(3, "O nome de usuário deve ter pelo menos 3 caracteres"),
    email: z.email("Email inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
})

export default RegisterCard;