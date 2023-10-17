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

// import * as z from 'zod';

// const customErrorMessage = 'This field is required'; // Define a custom error message

// export const teamMemberSchema = z.object({
//     name: z.string().min(2, customErrorMessage).max(50, customErrorMessage),
//     email: z.string().email('Invalid email format'),
//     year: z.string().min(4, customErrorMessage).max(4, customErrorMessage),
//     branch: z.string().min(2, customErrorMessage).max(50, customErrorMessage),
//     phone_number: z.string().regex(/^\d{10}$/, 'Invalid phone number format'),
// });

// export const registrationSchema = z.object({
//     teamName: z.string(),
//     members: z.array(
//         teamMemberSchema.refine((member) => {
//             // Check if any of the fields in the member object are empty
//             return Object.values(member).every((field) => field !== '');
//         }, { message: 'All fields are required' }) // Custom error message for required fields
//     ),
// });
