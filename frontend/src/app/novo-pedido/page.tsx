'use client'

import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { 
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { request } from "@/api/client"

// Schema
const itemSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, "Nome é obrigatório"),
  price: z.string().min(1, "Preço é obrigatório"),
  quantity: z.string().min(1, "Categoria é obrigatória"),
})

const formSchema = z.object({
  items: z.array(itemSchema).min(1, "Adicione pelo menos um item")
})

type FormData = z.infer<typeof formSchema>

export default function Page(): JSX.Element {

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: { items: [] }
    })

    const { control, handleSubmit, register, formState: { errors } } = form
    const { fields, prepend, remove } = useFieldArray({ control, name: "items" })

    const onSubmit = async (data: FormData) => {
        const requestConfig = {
            url: `order`,
            method: 'POST',
            body: {
                items: data.items
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
        <Card>
            <CardHeader>
                <CardTitle>Criar Pedido</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => prepend({id: '1', name: "", price: "", quantity: ""})}
                    >Adicionar Item</Button>
                    {fields.map((field, index) => (
                        <Card key={field.id} className="p-4 border border-gray-200">
                            <div className="space-y-2">
                                <div>
                                    <Label>Nome</Label>
                                    <Input
                                        {...register(`items.${index}.name`)}
                                        placeholder="Digite o nome"
                                    />
                                    {errors.items?.[index]?.name && (
                                        <p className="text-red-500 text-sm">
                                        {errors.items[index]?.name?.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label>Preço</Label>
                                    <p>R$ 50,00</p>
                                </div>
                                <div>
                                    <Label>Quantidade</Label>
                                    <Input
                                        type="number"
                                        {...register(`items.${index}.quantity`)}
                                        placeholder="1"
                                        min={1}
                                    />
                                    {errors.items?.[index]?.quantity && (
                                        <p className="text-red-500 text-sm">
                                        {errors.items[index]?.quantity?.message}
                                        </p>
                                    )}
                                </div>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => remove(index)}
                                >Excluir</Button>
                            </div>
                        </Card>
                    ))}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <p>Total:</p>
                    <p>R$ 50,00</p>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {console.log("cancelar")}}
                    >Cancelar</Button>
                    <Button
                        type="submit"
                        variant="outline"
                    >Criar</Button>
                </CardFooter>
            </form>
        </Card>
    )
}