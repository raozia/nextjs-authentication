/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SignupFormData, signupSchema } from "@/schemas/signup";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'

export default function SignupPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({ resolver: zodResolver(signupSchema) });
    const router = useRouter();
    const [Iserror, setIsError] = useState("");

    function handleSignup(form: SignupFormData) {
        const { name, email, password } = form;

        // Check if user already exists
        const existing = localStorage.getItem(email);
        if (existing) {
            setIsError("Email already registered. Please login.");
            return;
        }

        // Save user to localStorage
        localStorage.setItem(email, JSON.stringify({ name, email, password }));

        alert("Account created! Please login.");
        router.push("/login");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <form onSubmit={handleSubmit(handleSignup)}>
                    <h2 className="text-2xl font-bold mb-6 text-center text-black">Sign Up</h2>

                    {Iserror && <p className="text-red-500 mb-4 text-sm">{Iserror}</p>}

                    <input
                        {...register("name")}
                        name="name"
                        type="text"
                        placeholder="Name"
                        className={`w-full border p-2 rounded outline-none mb-4 text-black ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && <p className="text-red-500 mb-4 text-sm">{errors.name.message}</p>}
                    <input
                        {...register("email")}
                        name="email"
                        type="email"
                        placeholder="Email"
                        className={`w-full border p-2 rounded outline-none mb-4 text-black ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email?.message && <p className="text-red-500 mb-4 text-sm">{errors.email.message}</p>}
                    <input
                        {...register("password")}
                        name="password"
                        type="password"
                        placeholder="Password"
                        className={`w-full border p-2 rounded outline-none mb-4 text-black ${errors.password ? 'border-red-500' : ''}`}
                    />
                    {errors.password && <p className="text-red-500 mb-4 text-sm">{errors.password.message}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Create Account
                    </button>

                    <p className="mt-4 text-center text-sm text-black">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}