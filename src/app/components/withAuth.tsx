"use client";
import { useEffect, useState } from "react";
import { me } from "../services/authService";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userState } from "../jotai/user.jotai";
// Assuming axios is configured in this file

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthGuard = (props: any) => {
    const [, setUser] = useAtom(userState);
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
      null
    );

    useEffect(() => {
      const checkAuth = async () => {
        try {
          // Call the /me API to check authentication
          const response = await me();
          setUser(response);
          setIsAuthenticated(true);
        } catch (error) {
          setIsAuthenticated(false); // User is not authenticated
          router.push("/login"); // Redirect to login if not authenticated
        }
      };

      checkAuth();
    }, [router]);

    // Show a loading spinner while checking authentication
    if (isAuthenticated === null) {
      return <div>Loading...</div>; // Optional: Replace with a spinner
    }

    // If authenticated, render the wrapped component
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return AuthGuard;
};

export default withAuth;
