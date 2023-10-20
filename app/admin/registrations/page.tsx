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
    let id = '652cad6cbe1fe0dff10ee910'
    const getData = async () => {
        const res = await fetch(`https://yensambrama.onrender.com/api/event/${id}`)
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
                        <TableHead className={`w-[100px]`}>Team Name</TableHead>
                        <TableHead className="w-[200px]">Members</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>Branch</TableHead>
                        <TableHead>Events Registered</TableHead><TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item: any) => (
                        <TableRow>
                            <TableCell>{item.teamName}</TableCell>
                            <TableCell>
                                {item.members.map((member: any) => (
                                    <div key={member.id}>{member.name}</div>
                                ))}
                            </TableCell>
                            <TableCell>
                                {item.members.map((member: any) => (
                                    <div key={member.id}>{member.email}</div>
                                ))}
                            </TableCell>
                            <TableCell>
                                {item.members.map((member: any) => (
                                    <div key={member.id}>{member.phone_number}</div>
                                ))}
                            </TableCell>
                            <TableCell>
                                {item.members.map((member: any) => (
                                    <div key={member.id}>{member.branch}</div>
                                ))}
                            </TableCell>
                            <TableCell>
                                {item.members.map((member: any) => (
                                    <div key={member.id}>{member.totalEventsRegistered}</div>
                                ))}
                            </TableCell><TableCell>Paid</TableCell>
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