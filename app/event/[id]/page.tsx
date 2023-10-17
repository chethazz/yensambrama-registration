"use client"
import { RegistrationForm } from '@/components/RegistrationForm'
import { useSearchParams } from 'next/navigation'

import React from 'react'

const RegisterEvent = ({ params }: any) => {
    const examples = [
        { type: 'Client Components', src: 'app/_examples/client-component/page.tsx' },
        { type: 'Server Components', src: 'app/_examples/server-component/page.tsx' },
        { type: 'Server Actions', src: 'app/_examples/server-action/page.tsx' },
        { type: 'Route Handlers', src: 'app/_examples/route-handler.ts' },
    ]

    const searchParams = useSearchParams()
    const _id = searchParams.get('id')
    const eventType = searchParams.get('eventType')
    const min_team_member = searchParams.get('min_team_member')
    const max_team_member = searchParams.get('max_team_member')
    const minTeamMember = min_team_member ? parseInt(min_team_member, 10) : 1; // 2 is a default value
    const maxTeamMember = max_team_member ? parseInt(max_team_member, 10) : 10; // 5 is a default value
    console.log(minTeamMember, maxTeamMember)
    return (
        <div className="w-full flex flex-col items-center">
            <div className="animate-in flex flex-col gap-10  max-w-4xl px-3 py-16 lg:py-24 text-foreground">
                <div className="flex flex-col items-center  ">
                    <p className="text-3xl lg:text-4xl text-[#151615] !leading-tight mx-auto max-w-xl text-center my-8">
                        <strong>Register for the event</strong>
                    </p>
                </div>
                <div>
                    <p className="text-lg lg:text-xl text-[#151615] !leading-tight mx-auto max-w-xl my-8">
                        <strong>Rules : </strong>
                    </p>
                    <div className="w-full justify-center border rounded-lg overflow-hidden">

                        {examples.map(({ type, src }) => (
                            <div
                                key={type}
                                className="w-full grid grid-cols-3 border-b last:border-b-0 text-sm"
                            >
                                <div className="col-span-2 border-l p-4 flex items-center">
                                    <code className="text-sm whitespace-pre-wrap">{src}</code>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
                <RegistrationForm min_team_member={minTeamMember} max_team_member={maxTeamMember} eventId={_id as string} eventType={eventType as string} />
            </div>
        </div>
    )
}



export default RegisterEvent