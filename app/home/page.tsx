"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import NavBar from "@/components/NavBar";
interface User {
    name: string,
    email: string
}
export default function HomePage() {
    const router = useRouter();
    const [user, setUser] = useState<User>();

    console.log("Adding authenticaton testing")
    const fetchUser = async () => {
        try {
            const stored = await localStorage.getItem("loggedInUser");
            if (!stored) {
                router.push("/login");
                return;
            }
            setUser(JSON.parse(stored));
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        fetchUser()
    }, []);

    function handleLogout() {
        localStorage.removeItem("loggedInUser");
        // Clear the cookie too
        document.cookie = "loggedInUser=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        router.push("/login");
    }

    if (!user) return null; // Wait for data to load

    return (
        <>
            <div>
                {/* <div>
                    <NavBar />
                </div> */}
                <div className="min-h-screen flex items-center justify-center bg-gray-100">
                    <div className="bg-white p-8 rounded shadow-md text-center">
                        <h1 className="text-3xl font-bold mb-2 text-black">Welcome, {user.name}! 👋</h1>
                        <p className="text-gray-500 mb-6">{user.email}</p>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}