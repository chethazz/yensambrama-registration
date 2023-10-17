import * as z from 'zod'


export const teamMemberSchema = z.object({
    name: z.string().min(2, 'Name should be at least 2 characters'),
    email: z.string().email('Inavlid email'),
    year: z.string().min(1, { message: 'Year is required' }),
    branch: z.string().min(1, 'Branch is required'),
    phone_number: z.string().min(10, 'Phone number should be 10 digits'),
});
export const registrationSchema = z.object({
    teamName: z.string().min(2, 'Team name should be at least 2 characters'),
    members: z.array(
        teamMemberSchema
    ),
});
