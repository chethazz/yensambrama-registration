'use client'
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const Registrations = () => {
    const [data, setData] = React.useState([])
    let id = '652cad6cbe1fe0dff10ee908'
    const getData = async () => {
        const res = await fetch(`http://localhost:8000/api/event/${id}`)
        const data = await res.json()
        setData(data)
        console.log(data)
    }
    
    return (
        <>
            <button onClick={getData}>Registrations</button>
            {JSON.stringify(data)}
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item: any) => (
                        <TableRow>
                            <TableCell className="font-medium">{JSON.stringify(item.members)}</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Credit Card</TableCell>
                            <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default Registrations