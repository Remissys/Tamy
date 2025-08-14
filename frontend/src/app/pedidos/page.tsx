'use client'

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

//mock data
const pedidos = [
    {
        id: '1',
        price: 'R$50,00',
        status: 'Em andamento'
    },
    {
        id: '2',
        price: 'R$30,00',
        status: 'Em andamento'
    },
]

export default function Page(): JSX.Element {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
                {pedidos.map((value, index) => {
                    return(
                        <Card className="flex justify-between m-2 p-3 items-center">
                            <Label>Pedido</Label>
                            <p>{value.id}</p>
                            <Label>Preço</Label>
                            <p>{value.price}</p>
                            <Label>Status</Label>
                            <p>{value.status}</p>
                            <Button
                                onClick={() => {console.log('pedido cancelado')}}
                            >Cancelar</Button>
                            <Button
                                onClick={() => {console.log('pedido concluido')}}
                            >Concluir</Button>
                            {/*
                                Adicionar botão de detalhes (setinha para abrir e fechar)
                                    -> items do pedido | preço individual | quantidade
                            */}
                        </Card>
                    )
                })}
            </CardContent>
        </Card>
    )
}