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
export const RegistrationForm = ({ min_team_member = 2, max_team_member = 5, eventId, eventType }: RegistrationFormProps) => {
    const [teamMembers, setTeamMembers] = useState(min_team_member);
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
        try {
            const res = await fetch('/api/event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, eventId, eventType }),
            })
            if (res.status === 200) {
                const data = await res.json();
                alert(JSON.stringify(data, null, 2));
                form.reset(defaultValues);
                router.replace('/')
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
    const getData = async () => {
        const res = await fetch('/api/event', {
            cache: 'no-cache',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
        const data = await res.json()
        console.log(data)
    }

    const handleSubmit = async () => {
        const formData = form.getValues();
        console.log(formData)
        const res = await fetch('/api/test')
        console.log(res)
        try {
            // await fetch('/api/event', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(formData),
            // }).then((res) => {
            //     console.log(res)
            // }).catch((err) => {
            //     console.log(err)
            // })

            // if (res.status === 200) {
            //     const data = await res.json();
            //     alert(JSON.stringify(data, null, 2));

            //     // Clear the form values
            //     form.reset(defaultValues);

            //     // Rdirect to the home page
            //     router.push('/'); // Import 'useRouter' from 'next/router'

            // } else {
            //     const errorData = await res.json(); // Parse the error response
            //     if (errorData && errorData.message) {
            //         alert('Error: ' + errorData.message); // Display the error message
            //     } else {
            //         console.error('Request failed with status code ' + res.status);
            //     }
            // }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        console.log(form.formState.errors)
    })
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-5">
                {/* <form className="space-y-8 p-5"> */}
                {[...Array(teamMembers)].map((_, index) => (
                    <div key={index}>
                        <h2 className="text-2xl font-semibold">Team Member {index + 1}</h2>
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
                                        <FormMessage />
                                    </FormItem>
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
                                                placeholder="example?"
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
                            {teamMembers > min_team_member && (
                                <Button type="button" onClick={() => removeTeamMember(index)}>
                                    Remove Team Member
                                </Button>
                            )}
                        </div>
                    </div>
                ))}

                {teamMembers < max_team_member && (
                    <Button type="button" onClick={addTeamMember}>
                        Add Team Member
                    </Button>
                )}

                {teamMembers > min_team_member && (
                    <Button type="button" onClick={() => removeTeamMember(teamMembers - 1)}>
                        Remove Team Member
                    </Button>
                )}

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};


