'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChangeEvent, useEffect, useState } from 'react';
import { registrationSchema, teamMemberSchema } from '@/lib/zodSchema';
import { useRouter } from 'next/navigation';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
} from "@/components/ui/alert-dialog"
import LoadingSpinner from './LoadingSpinner';


type FieldProps = {
    field: {
        onChange: (event: ChangeEvent<HTMLInputElement>) => void;
        value: string;
    };
};

type ProfileFormValues = z.infer<typeof registrationSchema>;

type RegistrationFormProps = {
    min_team_member: number;
    max_team_member: number;
    eventId: string;
    eventType: string;
};
export const RegistrationForm = ({ min_team_member, max_team_member, eventId, eventType }: RegistrationFormProps) => {
    const [teamMembers, setTeamMembers] = useState(min_team_member);
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState('');
    const defaultValues: Partial<ProfileFormValues> = {
        teamName: '',
        members: Array(min_team_member).fill({
            name: '',
            email: '',
            phone_number: '',
            branch: '',
            year: '',
        }),
    };

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(registrationSchema),
        defaultValues,
        mode: 'onChange',
    });

    const { fields, append, remove } = useFieldArray({
        name: 'members',
        control: form.control,
    });
    const router = useRouter();

    async function onSubmit(data: ProfileFormValues) {
        setLoading(true)
        try {
            const res = await fetch('https://yensambrama.onrender.com/api/event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, eventId, eventType }),
            })
            if (res.status === 200) {
                const data = await res.json();
                setData(data.message);
                setIsOpen(true);
            } else {
                const errorData = await res.json(); // Parse the error response
                if (errorData && errorData.message) {
                    alert('Error: ' + errorData.message); // Display the error message
                } else {
                    console.error('Request failed with status code ' + res.status);
                }
            }
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const addTeamMember = () => {
        if (teamMembers < max_team_member) {
            append({
                name: '',
                email: '',
                phone_number: '',
                branch: '',
                year: '',
            });
            setTeamMembers(teamMembers + 1);
        }
    };

    const removeTeamMember = (index: number) => {
        if (teamMembers > min_team_member) {
            remove(index);
            setTeamMembers(teamMembers - 1);
        }
    };


    return (
        <>
            {loading && <LoadingSpinner />}
            <Form {...form}>
                <AlertDialog open={isOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogDescription>
                                <strong>  {data}</strong> <br />
                                Your registration has been submitted successfully. You will receive a confirmation email within 5 minutes. If you do not receive the email, please contact the program coordinators.
                            </AlertDialogDescription>

                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => {
                                form.reset(defaultValues), router.replace('/')
                            }}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-5">
                    {/* <form className="space-y-8 p-5"> */}
                    {max_team_member !== 1 && (
                        <FormField
                            control={form.control}
                            name={`teamName`}
                            render={({ field }: FieldProps) => (
                                <FormItem>
                                    <FormLabel className="text-lg">Team Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="min-w-[300px] md:min-w-[400px] lg:min-w-[500px]"
                                            placeholder="Enter your Full Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}


                    {[...Array(teamMembers)].map((_, index) => (
                        <div key={index}>
                            {max_team_member !== 1 && (
                                <h2 className="text-2xl font-semibold">Team Member {index + 1}</h2>
                            )}
                            <div>
                                <FormField
                                    control={form.control}
                                    name={`members.${index}.name`}
                                    render={({ field }: FieldProps) => (
                                        <FormItem>
                                            <FormLabel className="text-lg">Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="min-w-[300px] md:min-w-[400px] lg:min-w-[500px]"
                                                    placeholder="Enter your Full Name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`members.${index}.email`}
                                    render={({ field }: FieldProps) => (
                                        <FormItem>
                                            <FormLabel className="text-lg">Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="min-w-[300px] md:min-w-[400px] lg:min-w-[500px]"
                                                    placeholder="example@gmail.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`members.${index}.phone_number`}
                                    render={({ field }: FieldProps) => (
                                        <FormItem>
                                            <FormLabel className="text-lg">Phone Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="min-w-[300px] md:min-w-[400px] lg:min-w-[500px]"
                                                    placeholder="1122334455"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`members.${index}.year`}
                                    render={({ field }: FieldProps) => (
                                        <FormItem>
                                            <FormLabel className="text-lg">Year</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={(value) => {
                                                    form.setValue(`members.${index}.year`, value);
                                                }} // Adapt the function to provide the selected value as a string
                                                    defaultValue={field.value}>
                                                    <SelectTrigger className="min-w-[300px] md:min-w-[400px] lg:min-w-[500px]">
                                                        <SelectValue placeholder="Select Year" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="First">First</SelectItem>
                                                            <SelectItem value="Second">Second</SelectItem>
                                                            <SelectItem value="Third">Third</SelectItem>
                                                            <SelectItem value="Fourth">Fourth</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`members.${index}.branch`}
                                    render={({ field }: FieldProps) => (
                                        <FormItem>
                                            <FormLabel className="text-lg">Branch/Section</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="min-w-[300px] md:min-w-[400px] lg:min-w-[500px]"
                                                    placeholder="CSE/A"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>
                        </div>
                    ))}

                    <div className="flex justify-between">
                        <div className='space-x-3'>
                            {teamMembers < max_team_member && (
                                <Button type="button" onClick={addTeamMember}>
                                    Add
                                </Button>
                            )}
                            {teamMembers > min_team_member && (
                                <Button type="button" onClick={() => removeTeamMember(teamMembers - 1)}>
                                    Remove
                                </Button>
                            )}
                        </div>
                        <div>
                            <Button type="submit">Submit</Button>
                        </div>
                    </div>

                </form>
            </Form >
        </>
    );
};


