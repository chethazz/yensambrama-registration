import * as z from 'zod'


export const teamMemberSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    year: z.string(),
    branch: z.string(),
    phone_number: z.string(),
});
export const registrationSchema = z.object({
    teamName: z.string(),
    members: z.array(
        teamMemberSchema
    ),
});
