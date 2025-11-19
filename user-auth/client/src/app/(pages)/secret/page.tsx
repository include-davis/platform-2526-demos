'use client'
import getHello from "@/app/(util)/getHello";
import Cookies from "js-cookie";

import Link from "next/link";
import { useEffect, useState } from "react";

// This is a React component that uses data from a protected endpoint
// We only want this visible if the browser has an auth token
function SecretInfo() {
    const [helloText, setHelloText] = useState("");

    const populateHello = async () => {
        const hello = await getHello();
        setHelloText(hello.message);
    }
    
    useEffect(() => {
        populateHello();
    }, [])

    return <div>{helloText}</div>
}

export default function Secret() {
    const token = Cookies.get("auth_token");

    // Block access if we don't have auth token
    // If we didn't have this block, the API call will still fail if we don't have auth token
    // due to no authorization.
    if (!token) {
        return (
            <div>
                Unauthorized. Please <Link href="/log-in">log in</Link>.
            </div>
        );
    }

    // Show secret component if we have auth token
    return (
        <div>
            <p>secret text:</p>
            <SecretInfo/>
        </div>
    );
}