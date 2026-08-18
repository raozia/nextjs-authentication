import z from "zod";

export const LoginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Enter valid email address"),
    password: z
        .string()
        .min(6, "Password must be greater than 6 digits")
})

export type LoginFormData = z.infer<typeof LoginSchema>