import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

export default function Page() {
    return (
        <div className='flex justify-between'>
            <Card className='w-full mx-4'>
                <CardHeader>
                    <CardTitle>Faturamento do Dia</CardTitle>
                </CardHeader>
                <CardContent className='text-right'>
                    <h4>R$ 50,00</h4>
                </CardContent>
            </Card>
            <Card className='w-full mx-4'>
                <CardHeader>
                    <CardTitle>Pedidos</CardTitle>
                </CardHeader>
                <CardContent className='text-right'>
                    <h4>4</h4>
                </CardContent>
            </Card>
            <Card className='w-full mx-4'>
                <CardHeader>
                    <CardTitle>Ticket Médio</CardTitle>
                </CardHeader>
                <CardContent className='text-right'>
                    <h4>R$ 12,50</h4>
                </CardContent>
            </Card>
        </div>
    )
}