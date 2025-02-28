"use client";
// src/pages/signup.tsx
import React, { useEffect, useState } from "react";
import styles from "../../../styles/SignUp.module.css"; // Importing CSS module
import { me, signup } from "../../../services/authService";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAtom } from "jotai";
import { loadingAtom } from "@/jotai/loader.jotai";
import { userState } from "@/jotai/user.jotai";
import Spinner from "@/components/Spinner";

const SignUp: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [, setLoader] = useAtom(loadingAtom);
  const [, setUser] = useAtom(userState);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await me();
        router.push("/movies");
      } catch (error) { }
    };

    checkAuth();
  }, [router]);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Handle sign-up logic here
    try {
      if (password !== confirmPassword) {
        throw { message: "passwords doesn't matched" };
      }
      setLoader(true)
      const user = await signup({
        email,
        password,
        firstName,
        lastName,
      });
      setUser(user)
      setShowError(false);
      router.push("/movies");
    } catch (error: any) {
      console.error(error?.message);
      setError(error?.message || "something went wrong");
      setShowError(true);

      // Handle error (show error message)
    }
    setLoader(false)
  };

  return (
    <div className={styles.container}>
      <Spinner></Spinner>
      <h1 className={styles.title}>Sign Up</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          className={styles.input}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          className={styles.input}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className={styles.input}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {showError ? <p className={styles.error}>{error}</p> : <></>}
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
      </form>

      <p className={styles.text}>
        Already have an account?
        <Link href="/auth/login">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;
