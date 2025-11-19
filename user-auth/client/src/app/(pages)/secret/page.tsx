'use client'

import Link from "next/link";

export default function Secret() {
    const token = localStorage.getItem("auth_token");
    if (!token) {
        return (
            <div>
                Unauthorized. Please <Link href="/log-in">log in</Link>.
            </div>
        );
    }
    return <div>secret page. you are authenticated!</div>;
}