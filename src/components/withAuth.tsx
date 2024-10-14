import { useEffect, useState } from "react";
import { me } from "../services/authService";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userState } from "../jotai/user.jotai";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AuthGuard = (props: P) => {
    const [user, setUser] = useAtom(userState);
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
      null
    );

    useEffect(() => {
      const checkAuth = async () => {
        try {
          if (user) {
            setIsAuthenticated(true);
            return
          }
          const response = await me();
          setUser(response);
          setIsAuthenticated(true);
        } catch (error) {
          setIsAuthenticated(false);
          router.push("/auth/login");
        }
      };

      checkAuth();
    }, [router]);

    if (isAuthenticated === null) {
      return <div className="loading-text"> <h3>Loading...</h3></div>;
    }

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return AuthGuard;
};

export default withAuth;
