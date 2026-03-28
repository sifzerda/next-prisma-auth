// src/app/profile/page.js
"use client";

import { useEffect, useState } from "react";

export default function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            const res = await fetch("/api/me", {
                credentials: "include",
            });
            const data = await res.json();
            console.log("ME RESPONSE:", data); // Debug log
            setUser(data);
        }

        fetchUser();
    }, []);

    if (!user) return <p>Loading...</p>;

    return (
        <div className="p-10">
            <h1 className="text-2xl">Dashboard</h1>
            <p>Welcome user ID: {user.userId}</p>
        </div>
    );
}