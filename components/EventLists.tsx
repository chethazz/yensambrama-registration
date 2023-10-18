'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import LoadingSpinner from './LoadingSpinner';
import Image from 'next/image';

type EventListsProps = {
    name: string;
    id: string;
}


const EventLists = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [eventList, setEventList] = useState([])
    const getData = async () => {
        try {
            setLoading(true)
            const res = await fetch('https://yensambrama.onrender.com/api/event', {
                cache: 'no-cache',
            })
            const data = await res.json()
            if (data) {
                setEventList(data)
            }
        } catch (error) {
            console.log(error)
            setError(true)
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getData()
    }, [])
    console.log(eventList)
    if (error) return <div className='flex text-lg font-semibold text-red-600 justify-center h-screen items-center'>Internal Server Error. Please contact the respected team coordinators for registration</div>
    return (
        <>
            {!loading &&
                <LoadingSpinner />
            }
            {eventList && eventList?.map(({ name, image, theme, venue, rules, id, _id, eventType, min_team_members, max_team_members, student_coodinators }) => (
                <Link
                    key={name}
                    className="relative flex flex-col group rounded-2xl hover:border-foreground"
                    href={{
                        pathname: `/event/${id}`,
                        query: {
                            id: _id,
                            eventId: id,
                            eventType: eventType,
                            min_team_member: min_team_members,
                            max_team_member: max_team_members,
                            name: name,
                            theme: theme,
                            venue: venue,
                            rules: JSON.stringify(rules), // Convert array to a string
                            student_coodinators: JSON.stringify(student_coodinators),

                        }
                    }}
                    rel="noreferrer"
                >

                    <div className="relative group rounded-2xl hover:border-foreground   transform transition duration-500 hover:scale-105 cursor-pointer">
                        <div className="h-64 w-full min-w-[300px] relative">
                            <Image
                                className="w-full h-full object-cover rounded-3xl"
                                src={image}
                                fill
                                alt="Event Image"
                            />
                            {/* <img
                                className="w-full h-full object-cover rounded-3xl"
                                src={image}
                                alt="Event Image"
                            /> */}
                            <div className="absolute inset-0 flex items-center text-justify justify-center text-black text-2xl min-h-[40px] lg:min-h-[60px] font-bold opacity-90 bg-gray-400 bg-opacity-80 rounded-3xl">
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