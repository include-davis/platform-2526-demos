'use client'
import { useEffect, useState } from "react";
import { getData } from "@/app/(util)/getGithubInfo";
import Image from "next/image";

interface GithubUser {
    avatar_url: string;
    id: number;
}

export default function GithubInfo() {
    const [userData, setUserData] = useState<GithubUser>({
        avatar_url: '',
        id: 0,
    });
    const [textInput, setTextInput] = useState('');
    const [username, setUsername] = useState("naomitzhao");

    useEffect(() => {
        const fetchAndSetUser = async() => {
            const userData = await getData(username);
            setUserData(userData);
        }

        fetchAndSetUser();
    }, [username]);
    
    return(
        <div>
            <h2>{username}</h2>
            {userData.avatar_url && <Image
                src={userData.avatar_url}
                height={100}
                width={100}
                alt={"Github user's avatar image"}
            />}
            <p>get data for user</p>
            <input
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
            />
            <button
                onClick={() => {
                    setUsername(textInput);
                }}
            >get user info</button>
        </div>
    );
}