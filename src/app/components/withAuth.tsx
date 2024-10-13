import { useEffect, useState } from "react";
import { me } from "../services/authService";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userState } from "../jotai/user.jotai";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AuthGuard = (props: P) => {
    const [, setUser] = useAtom(userState);
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
      null
    );

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await me();
          setUser(response);
          setIsAuthenticated(true);
        } catch (error) {
          setIsAuthenticated(false);
          router.push("/login");
        }
      };

      checkAuth();
    }, [router]);

    if (isAuthenticated === null) {
      return <div>Loading...</div>;
    }

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return AuthGuard;
};

export default withAuth;
