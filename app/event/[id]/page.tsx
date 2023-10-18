"use client"
import { RegistrationForm } from '@/components/RegistrationForm'
import { useSearchParams } from 'next/navigation'
import React from 'react'
const RegisterEvent = ({ params }: any) => {
    const examples = [{ type: 'Client Components', src: 'app/_examples/client-component/page.tsx' }, { type: 'Server Components', src: 'app/_examples/server-component/page.tsx' }, { type: 'Server Actions', src: 'app/_examples/server-action/page.tsx' }, { type: 'Route Handlers', src: 'app/_examples/route-handler.ts' },]
    const searchParams = useSearchParams()
    const _id = searchParams.get('id')
    const eventId = searchParams.get('eventId')
    const eventType = searchParams.get('eventType')
    const min_team_member = searchParams.get('min_team_member')
    const max_team_member = searchParams.get('max_team_member')
    const minTeamMember = min_team_member ? parseInt(min_team_member, 10) : 1;
    const maxTeamMember = max_team_member ? parseInt(max_team_member, 10) : 10;
    const name = searchParams.get('name')
    const venue = searchParams.get('venue')
    const theme = searchParams.get('theme')
    const rules = searchParams.get('rules')
    const rulesArray = Array.isArray(rules) ? rules : [rules];
    const parsedRules = rulesArray.map((rule) => JSON.parse(rule));
    const student_coodinators = searchParams.get('student_coodinators')
    const student_coodinatorsArray = Array.isArray(student_coodinators) ? student_coodinators : [student_coodinators];
    const parsedStudentCoodinators = student_coodinatorsArray.map((rule) => JSON.parse(rule));

    console.log(rulesArray)
    return (
        <div className="w-full flex flex-col items-center">
            <div className="animate-in flex flex-col   max-w-4xl  lg:py-24 text-foreground">
                <div className="flex flex-col items-center  ">
                    <p className="text-3xl lg:text-4xl text-[#151615] !leading-tight mx-auto max-w-xl text-center my-8">
                        <strong>Event Details</strong>
                    </p>
                </div>
                <div className='p-5'>

                    {name && (
                        <p className="text-lg lg:text-xl text-[#151615] !leading-tight mx-auto   my-5">
                            <strong>Event Name :  </strong> {name}
                        </p>
                    )}
                    {venue && (
                        <p className="text-lg lg:text-xl text-[#151615] !leading-tight mx-auto   my-5">
                            <strong>Venue :  </strong> {venue}</p>
                    )}
                    {theme && (
                        <p className="text-lg lg:text-xl text-[#151615] !leading-tight mx-auto  my-5"><strong>Theme :  </strong> {theme}</p>
                    )}
                    {parsedStudentCoodinators && parsedStudentCoodinators[0].map((coodinator: any, index: any) => (
                        <p key={index} className="text-lg lg:text-xl text-[#151615] !leading-tight mx-auto  my-5"><strong>Student Coodinator {index + 1} :  </strong> {coodinator.name} - {coodinator.phone_number}</p>
                    ))}

                </div>
                <div className='px-10'>
                    <p className="text-lg lg:text-xl text-[#151615] !leading-tight mx-auto  my-5">
                        <strong>Rules : </strong>
                    </p>
                    <div className="w-full max-w-2xl justify-center  rounded-lg overflow-hidden">
                        {parsedRules[0].map((rule: any, index: any) => (
                            <div key={index} className="w-full   last:border-b-0 text-sm">
                                <div className=" p-3 flex items-center">
                                    <code className="text-sm whitespace-pre-wrap "><strong>{index + 1}. </strong>{rule}</code>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
                <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
                <div className="flex flex-col items-center  ">
                    <p className="text-3xl mt-10 lg:text-4xl text-[#151615] !leading-tight mx-auto max-w-xl text-center my-8">
                        <strong>Register</strong>
                    </p>
                </div>
                <RegistrationForm min_team_member={minTeamMember} max_team_member={maxTeamMember} eventId={_id as string} eventType={eventType as string} />
            </div>
        </div>
    )
}
export default RegisterEvent