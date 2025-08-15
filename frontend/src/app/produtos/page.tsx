'use client'

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { 
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { request } from "@/api/client"
import { ProductInterface } from "@/interfaces/product"

const createFormData = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  price: z.string().min(1, "Preço é obrigatório"),
  category: z.string().min(1, "Categoria é obrigatória"),
})

type CreateFormData = z.infer<typeof createFormData>

export default function Page(): JSX.Element {
    const [ products, setProducts ] = useState<ProductInterface[]>([])
    const [addNewProduct, setAddNewProduct] = useState<boolean>(false)
    
    const createForm = useForm<CreateFormData>({
        resolver: zodResolver(createFormData),
        defaultValues: {
            name: "",
            price: "",
            category: ""
        }
    })

    const { handleSubmit, register, reset, formState: { errors } } = createForm

    const onSubmit = async (data: CreateFormData) => {
        const requestConfig = {
            url: `product`,
            method: 'POST',
            body: {
                name: data.name,
                price: data.price,
                category: data.category,
            }
        }

        const requestResponse = await request(requestConfig)

        if(requestResponse.success) {
            const newProduct: ProductInterface = {
                id: requestResponse.data.id,
                name: data.name,
                price: data.price,
                category: parseInt(data.category)
            }
            setProducts(prevProducts => [...prevProducts, newProduct])
            reset()
            setAddNewProduct(false) 
        } else {
            alert('Erro ao criar produto')
        }
    }

    const removeProduct = (index: number) => {
        setProducts(prevProducts => prevProducts.filter((_, i) => i !== index))
    }

    useEffect(() => {
        const fetchProducts = async () => {
            const requestConfig = {
                url: 'product',
                method: 'GET'
            }

            const response = await request(requestConfig)

            console.log(response)

            if (response.success) {
                console.log('Produtos:', response.data)
                setProducts(response.data)
            } else {
                console.error('Failed to fetch produtos')
            }
        }

        fetchProducts()
    }, [])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Produtos</CardTitle>
            </CardHeader>
            <CardContent>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => setAddNewProduct(!addNewProduct)}
                >Criar Produto</Button>
                {addNewProduct ?
                    <form onSubmit={handleSubmit(onSubmit as any)}>
                        <Card className="my-3 p-2 border border-gray-200">
                            <div className="flex m-2 justify-between">
                                <div>
                                    <Label>Nome</Label>
                                    <Input
                                        {...register("name")}
                                        id="name"
                                        placeholder="Digite o nome"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                                </div>
                                <div>
                                    <Label>Preço</Label>
                                    <Input
                                        {...register("price")}
                                        id="price"
                                        placeholder="Digite o preço"
                                    />
                                    {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                                </div>
                                <div>
                                    <Label>Categoria</Label>
                                    <Input
                                        {...register("category")}
                                        id="category"
                                        type="number"
                                        placeholder="1"
                                        min={1}
                                    />
                                    {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
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
                                        type="submit"
                                        size="sm"
                                        >Criar</Button>
                                </div>
                            </div>
                        </Card>
                    </form>
                :<></>}
                {products.map((value, index) => (
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
                                    onClick={() => removeProduct(index)}
                                >Excluir</Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </CardContent>
        </Card>
    )
}