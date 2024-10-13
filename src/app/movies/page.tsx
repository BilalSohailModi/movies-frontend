"use client";
import React from "react";
import styles from "../styles/Movies.module.css";
import Image from "next/image";
import { logout } from "../services/authService";
import { useRouter } from "next/navigation";
import withAuth from "../components/withAuth";
import { useAtom } from "jotai";
import { userState } from "../jotai/user.jotai";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

const moviesData = [
  { title: "Movie 1", year: "2021", imageUrl: "/path/to/image1.jpg" },
  { title: "Movie 2", year: "2021", imageUrl: "/path/to/image2.jpg" },
  { title: "Movie 3", year: "2021", imageUrl: "/path/to/image3.jpg" },
  { title: "Movie 4", year: "2021", imageUrl: "/path/to/image4.jpg" },
  { title: "Movie 5", year: "2021", imageUrl: "/path/to/image5.jpg" },
  { title: "Movie 6", year: "2021", imageUrl: "/path/to/image6.jpg" },
];

const Movies: React.FC = () => {
  const router = useRouter();
  const [user] = useAtom(userState);
  console.log({ user });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>
          My Movies
          <Link href="/movies/create" passHref>
            <FaPlus className={styles.icon} />
          </Link>
        </h1>
        <button
          className={styles.logout}
          onClick={() => {
            logout(router);
          }}
        >
          Logout
        </button>
      </header>
      <div className={styles.grid}>
        {moviesData.map((movie, index) => (
          <div className={styles.card} key={index}>
            <Image
              src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt="External Image"
              width={500}
              height={300}
            />

            <h2 className={styles.movieTitle}>{movie.title}</h2>
            <p className={styles.year}>{movie.year}</p>
          </div>
        ))}
      </div>
      <footer className={styles.pagination}>
        <button className={styles.paginationButton}>Prev</button>
        <span className={styles.pageNumber}>1</span>
        <button className={styles.paginationButton}>2</button>
        <button className={styles.paginationButton}>Next</button>
      </footer>
    </div>
  );
};

export default withAuth(Movies);
