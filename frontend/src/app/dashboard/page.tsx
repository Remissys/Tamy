'use client'

import { request } from '@/api/client'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { useEffect, useState } from 'react'

export default function Page() {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [ dashboardData, setDashboardData ] = useState({
        revenue: 0,
        orders: 0,
        averageTicket: 0
    })

    useEffect(() => {
        const fetchDashboardData = async () => {
            const requestConfig = {
                url: 'dashboard',
                method: 'GET'
            }

            const response = await request(requestConfig)

            if (response.success) {
                setDashboardData(response.data)
            } else {
                alert('Erro ao buscar dados do dashboard')
                console.error('Failed to fetch dashboard data')
            }

            setIsLoading(false)
        }

        fetchDashboardData()
    }, [])

    if (isLoading) {
        return <div>Carregando...</div>
    }

    return (
        <div className='flex justify-between'>
            <Card className='w-full mx-4'>
                <CardHeader>
                    <CardTitle>Faturamento do Dia</CardTitle>
                </CardHeader>
                <CardContent className='text-right'>
                    <h4>R$ {dashboardData.revenue}</h4>
                </CardContent>
            </Card>
            <Card className='w-full mx-4'>
                <CardHeader>
                    <CardTitle>Pedidos</CardTitle>
                </CardHeader>
                <CardContent className='text-right'>
                    <h4>{dashboardData.orders}</h4>
                </CardContent>
            </Card>
            <Card className='w-full mx-4'>
                <CardHeader>
                    <CardTitle>Ticket Médio</CardTitle>
                </CardHeader>
                <CardContent className='text-right'>
                    <h4>{dashboardData.averageTicket}</h4>
                </CardContent>
            </Card>
        </div>
    )
}