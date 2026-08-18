/* eslint-disable react-hooks/immutability */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, LoginSchema } from "@/schemas/login";

export default function LoginPage() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({ resolver: zodResolver(LoginSchema) })
    const [error, setError] = useState("");

    function handleLogin(data: LoginFormData) {
        const { email, password } = data;

        // Fetch user from localStorage
        const stored = localStorage.getItem(email);

        if (!stored) {
            setError("No account found. Please signup first.");
            return;
        }

        const user = JSON.parse(stored);

        if (user.password !== password) {
            setError("Incorrect password.");
            return;
        }

        // ✅ Save logged in user info
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        // ✅ Also set a cookie so middleware can read it
        document.cookie = `loggedInUser=${user.email}; path=/`;

        router.push("/home");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <form onSubmit={handleSubmit(handleLogin)}>
                    <h2 className="text-2xl font-bold mb-6 text-center text-black">Login</h2>

                    {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

                    <input
                        {...register("email")}
                        name="email"
                        type="email"
                        placeholder="Email"
                        className={`w-full border p-2 outline-none rounded mb-4 text-black ${errors.email ? 'border-red-500' : ' '}`}
                    />
                    {errors.email && <p className="text-red-500 mb-4 text-sm">{errors.email.message}</p>}
                    <input
                        {...register("password")}
                        name="password"
                        type="password"
                        placeholder="Password"
                        className={`w-full border p-2 outline-none rounded mb-4 text-black ${errors.password ? 'border-red-500' : ' '}`}
                    />
                    {errors.password && <p className="text-red-500 mb-4 text-sm">{errors.password.message}</p>}

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    >
                        Login
                    </button>

                    <p className="mt-4 text-center text-sm text-black">
                        Don&#39;t have an account?{" "}
                        <Link href="/signup" className="text-blue-500 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}