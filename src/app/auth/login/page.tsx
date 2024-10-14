"use client";
import React, { useEffect, useState, ChangeEvent } from "react";
import styles from "../../../styles/SignIn.module.css";
import { login, me } from "../../../services/authService";

import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userState } from "../../../jotai/user.jotai";
import Link from "next/link";
import Spinner from "../../../components/Spinner";
import { loadingAtom } from "../../../jotai/loader.jotai";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const [, setUser] = useAtom(userState);
  const [, setLoader] = useAtom(loadingAtom);
  const [error, setError] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await me();
        setUser(response);
        router.push("/movies");
      } catch (error) { }
    };

    checkAuth();
  }, [router]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Handle form submission logic (e.g., API call)
    try {
      setLoader(true)
      const user = await login({ email, password }, rememberMe);
      setShowError(false);
      router.push("/movies");
      // Redirect user or save the auth token as needed
    } catch (error: any) {
      console.error(error?.message);
      setError(error?.message || "something went wrong");
      setShowError(true);
      // Handle error (show error message)
    }
    setLoader(false)
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked);
  };

  return (
    <div className={styles.container}>
      <Spinner></Spinner>
      <div className={styles.card}>
        <h2 className={styles.title}>Sign in</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {showError ? <p className={styles.error}>{error}</p> : <></>}

          <div className={styles.rememberMe}>
            <label>
              <input type="checkbox" onChange={handleCheckboxChange} />
              Remember me
            </label>
          </div>

          <button className={styles.loginButton} type="submit">
            <div className={styles.buttonContainer}>
              <p>Login</p>
            </div>
          </button>
        </form >
        <p className={styles.text}>
          Don't have an account?
          <Link href="/auth//signUp" style={{ marginTop: "10px" }}>
            Create Account
          </Link>
        </p>
      </div >
    </div >
  );
};

export default SignIn;
