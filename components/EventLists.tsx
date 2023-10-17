'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type EventListsProps = {
    name: string;
    id: string;
}


const EventLists = () => {
    const backgroundImageUrl = 'https://i.pinimg.com/originals/08/b6/9a/08b69a75b930a7eb7d293575d729a6bd.jpg'; // Replace with your image URL

    const [eventList, setEventList] = useState([])

    // const getData = async () => {
    //     const res = await fetch('/api/event', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({}),
    //     })
    //     const data = await res.json()
    //     if (data) {
    //         setEventList(data)
    //     }
    //     console.log(data)
    // }
    const getData = async () => {
        const res = await fetch('https://yensambrama.onrender.com/api/event', {
            cache: 'no-cache',
            mode: 'no-cors',
        })
        console.log(res)
        const data = await res.json()
        if (data) {
            setEventList(data)
        }
        console.log(data)
    }
    useEffect(() => {
        getData()
    }, [])
    console.log(eventList)
    let error;
    if (error) return <div className='flex text-lg font-semibold text-red-600 justify-center h-screen items-center'>Internal Server Error. Please contact the respected team coordinators for registration</div>
    return (
        // <div className="relative max-w-xl mx-auto mt-20">
        //     <img className="h-64 w-full object-cover rounded-md" src="https://i.pinimg.com/originals/08/b6/9a/08b69a75b930a7eb7d293575d729a6bd.jpg" alt="Random image" />
        //         <div className="absolute inset-0 bg-gray-700 opacity-60 rounded-md"></div>
        //         <div className="absolute inset-0 flex items-center justify-center">
        //             <h2 className="text-white text-3xl font-bold">Get Lost in Mountains</h2>
        //         </div>
        // </div>
        <>
            {eventList && eventList?.map(({ name, id, _id, eventType, min_team_members, max_team_members }) => (

                <Link
                    key={name}
                    className="relative flex flex-col group rounded-2xl hover:border-foreground"
                    href={{
                        pathname: `/event/${id}`,
                        query: { id: _id, eventType: eventType, min_team_member: min_team_members, max_team_member: max_team_members }
                    }}
                    rel="noreferrer"
                >
                    {/* <h3 className="font-bold mb-2 text-white text-xl min-h-[40px] lg:min-h-[60px]">
                {name}
            </h3>
            <div className="flex flex-col grow gap-4 justify-between">
                <p className="text-sm opacity-70">some description foes her <em></em></p>
                <div className="flex justify-between items-center">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="opacity-80 group-hover:opacity-100"
                    >
                        <path
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all"
                    >
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </div>
            </div> */}
                    <div className="relative group rounded-2xl hover:border-foreground   transform transition duration-500 hover:scale-105 cursor-pointer">
                        <div className="h-64 w-full relative">
                            <img
                                className="w-full h-full object-cover rounded-3xl"
                                src={backgroundImageUrl}
                                alt="Event Image"
                            />
                            <div className="absolute inset-0 flex items-center text-justify justify-center text-white text-2xl min-h-[40px] lg:min-h-[60px] font-bold opacity-95 bg-gray-800 bg-opacity-80 rounded-3xl">
                                {name}
                            </div>

                        </div>

                    </div>
                </Link>
            ))}
        </>
    )
}

export default EventLists