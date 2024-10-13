import React from "react";
import styles from "@/app/styles/EmptyMovieList.module.css";
import { useRouter } from "next/navigation";

const EmptyMovieList = () => {
  const router = useRouter();
  const handleAddMovie = () => {
    router.push("/movies/create");
    console.log("Add a new movie button clicked");
  };

  return (
    <div className={styles.container}>
      <div className={styles.message}>Your movie list is empty</div>
      <div className={styles.addButton} onClick={handleAddMovie}>
        Add a new movie
      </div>
    </div>
  );
};

export default EmptyMovieList;
