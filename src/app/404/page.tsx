"use client";
import { useRouter } from "next/navigation";

const Custom404 = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/movies"); // Redirect to the movies page (or root `/`)
  };

  return (
    <div style={{ textAlign: "center", padding: "100px 20px" }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <button
        onClick={handleGoHome}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Go to Home
      </button>
    </div>
  );
};

export default Custom404;
