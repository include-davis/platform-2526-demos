'use client'
import { useState } from "react";
import styles from "./page.module.scss";
import logIn from "@/app/(util)/logIn";
import Link from "next/link";
import Cookies from "js-cookie";

export default function LogIn() {
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");

  return (
    <div className={styles.page}>
      <h1>Log In</h1>
      <div>
        <label>Username</label>
        <input
          value={usernameInput}
          onChange={(e) => {setUsernameInput(e.target.value)}}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          value={passwordInput}
          onChange={(e) => {setPasswordInput(e.target.value)}}
        />
      </div>
      <button onClick={() => logIn(usernameInput, passwordInput)}>Log In</button>
      <button onClick={() => {
        console.log(Cookies.get("auth_token"));
      }}>Check token</button>
      <Link href="/secret">go to secret page</Link>
    </div>
  );
}
