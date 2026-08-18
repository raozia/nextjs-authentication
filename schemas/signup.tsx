import z from "zod";

export const signupSchema = z.object({
    name: z
        .string()
        .min(3, "Name is required"),
    email: z
        .string()
        .min(1, "Email is required")
        .email("Enter valid email address"),
    password: z
        .string()
        .min(6, "Password must be greater than 6 digits")
})

export type SignupFormData = z.infer<typeof signupSchema>;