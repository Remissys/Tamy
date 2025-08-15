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
import { request } from "@/api/client"

const LoginCard = (
    { changeFormMethod }: { changeFormMethod: () => void }
) => {
    
    const {register, handleSubmit} = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: { username: "", password: "" },
    })

    const submitForm = async (data: LoginFormData) => {
        const requestConfig = {
            url: `login`,
            method: 'POST',
            body: {
                username: data.username,
                password: data.password,
            }
        }

        const requestResponse = await request(requestConfig)

        if(requestResponse.success) {
            // Lógica para lidar com o login bem-sucedido
        } else {
            alert('Erro ao fazer login')
        }
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-center">Login</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit(submitForm)}>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Usuário</Label>
                            <Input
                                id="username"
                                type="name"
                                placeholder="Usuário"
                                required
                                {...register('username')}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input 
                                id="password" 
                                type="password" 
                                placeholder="***"
                                required
                                {...register('password')}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button
                        type="submit" className="w-full"
                    >Login</Button>
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={changeFormMethod}
                    >Registrar</Button>
                </CardFooter>
            </form>
        </Card>
    )
}

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
})
type LoginFormData = z.infer<typeof loginSchema>;

export default LoginCard;