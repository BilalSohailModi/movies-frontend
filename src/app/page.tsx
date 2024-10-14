"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Spinner from "../components/Spinner";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/movies"); // Redirect to /movies
  }, [router]);
  return <></>;
}
