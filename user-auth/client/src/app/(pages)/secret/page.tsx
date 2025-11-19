'use client'
import getHello from "@/app/(util)/getHello";
import Cookies from "js-cookie";

import Link from "next/link";
import { useEffect, useState } from "react";

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
    if (!token) {
        return (
            <div>
                Unauthorized. Please <Link href="/log-in">log in</Link>.
            </div>
        );
    }
    return (
    <div>
        <p>secret text:</p>
        <SecretInfo/>
    </div>
    );
}