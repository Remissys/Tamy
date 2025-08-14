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

// Schema
const itemSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, "Nome é obrigatório"),
  price: z.string().min(1, "Preço é obrigatório"),
  category: z.string().min(1, "Categoria é obrigatória"),
})

const formSchema = z.object({
  items: z.array(itemSchema).min(1, "Adicione pelo menos um item")
})

type FormData = z.infer<typeof formSchema>

//mock data
const produtos = [
    {
        id: 1,
        name: 'Produto 1',
        price: '50,00',
        category: 1 //select value
    },
    {
        id: 2,
        name: 'Produto 2',
        price: '20,00',
        category: 2
    }
]

export default function Page(): JSX.Element {

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: { items: [] }
    })

    const { control, handleSubmit, register, formState: { errors } } = form
    const { fields, append, remove } = useFieldArray({ control, name: "items" })

    const onSubmit = (data: FormData) => {
        console.log("Pedido criado:", data)
    }

    // mock data
    // const [produtos, setProdutos] = useState([{uuid: '', name: '', price: '', category: ''}])

    // const addNewProduct = (): void => {
    //     setProdutos(prev => [
    //         ...prev,
    //         {
    //             uuid: '',
    //             name: '',
    //             price: '',
    //             category: ''
    //         }
    //     ])
    // }

    const [addNewProduct, setAddNewProduct] = useState<boolean>(false)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Produtos</CardTitle>
            </CardHeader>
            <CardContent>
                <Button
                    type="button"
                    variant="outline"
                    // onClick={() => append({id: uuidv4(),name: "",price: "",category: ""})}
                    // onClick={() => append({id: '1', name: "", price: "", category: ""})}
                    onClick={() => setAddNewProduct(!addNewProduct)}
                >Criar Produto</Button>
                {addNewProduct ?
                    <Card className="my-3 p-2 border border-gray-200">
                        <div className="flex m-2 justify-between">
                            <div>
                                <Label>Nome</Label>
                                <Input
                                    placeholder="Digite o nome"
                                />
                            </div>
                            <div>
                                <Label>Preço</Label>
                                <Input
                                    placeholder="Digite o nome"
                                />
                            </div>
                            <div>
                                <Label>Categoria</Label>
                                <Input
                                    type="number"
                                    placeholder="1"
                                    min={1}
                                />
                            </div>
                        </div>
                        <div className="p-2 flex justify-end">
                            <div className="flex items-center">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {console.log('cancelar'), setAddNewProduct(false)}}
                                >Cancelar</Button>
                                <Button
                                    type="button"
                                    size="sm"
                                    onClick={() => {console.log('concluir')}}
                                >Criar</Button>
                            </div>
                        </div>
                    </Card>
                :<></>}
                {produtos.map((value, index) => (
                    <Card key={value.id} className="my-3 p-2 border border-gray-200">
                        <div className="flex m-2 justify-between">
                            <div>
                                <Label>Nome</Label>
                                <p>{value.name}</p>
                            </div>
                            <div>
                                <Label>Preço</Label>
                                <p>{value.price}</p>
                            </div>
                            <div>
                                <Label>Categoria</Label>
                                <p>{value.category}</p>
                            </div>
                            <div className="flex items-center">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => console.log('editar habilitado')}
                                >Editar</Button>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => remove(index)}
                                >Excluir</Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </CardContent>
        </Card>
    )
}