"use client";
import React, { useEffect, useState } from "react";
import styles from "../styles/Movies.module.css";
import Image from "next/image";
import { logout } from "../services/authService";
import { useRouter } from "next/navigation";
import withAuth from "../components/withAuth";
import { useAtom } from "jotai";
import { userState } from "../jotai/user.jotai";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { iPagintedResults, Movie } from "../interfaces/movie.interface";
import { fetchMovies } from "../services/movieService";
import EmptyMovieList from "../components/EmptyMovieList";

const PAGE_LIMIT = 8;
const Movies: React.FC = () => {
  const router = useRouter();
  const [user] = useAtom(userState);
  const [activePage, setActivePage] = useState(1);

  const [movies, setMovies] = useState<iPagintedResults<Movie>>();
  const getMovies = async () => {
    try {
      const response = await fetchMovies({
        limit: PAGE_LIMIT,
        offset: (activePage - 1) * PAGE_LIMIT,
      });
      setMovies(response);
    } catch (error) {}
  };
  useEffect(() => {
    getMovies();
  }, [activePage]);

  const onPageChange = (page: number) => {
    if (page == activePage) return;
    setActivePage(page);
  };

  function getPageNumbers(TotalCount: number): number[] {
    const size = Math.ceil(TotalCount / PAGE_LIMIT);
    return Array.from({ length: size }, (_, index) => index + 1);
  }

  return movies?.PageResult.length === 0 ? (
    <EmptyMovieList />
  ) : (
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
        {movies?.PageResult.map((movie, index) => (
          <div
            className={styles.card}
            key={index}
            onClick={() => {
              router.push(`/movies/${movie.id}`);
            }}
          >
            <Image
              src={movie.poster}
              alt="External Image"
              width={500}
              height={300}
            />

            <h2 className={styles.movieTitle}>{movie.title}</h2>
            <p className={styles.year}>{movie.publishingYear}</p>
          </div>
        ))}
      </div>
      {movies ? (
        <footer className={styles.pagination}>
          <button
            disabled={!movies.HasPreviousPage}
            className={`${styles.paginationButton} ${
              !movies.HasPreviousPage ? styles.disabledButton : ""
            }`}
            onClick={() => onPageChange(activePage - 1)}
          >
            Prev
          </button>
          {getPageNumbers(movies.TotalCount).map((item) => {
            return (
              <button
                className={
                  activePage == item
                    ? styles.paginationButton
                    : styles.inActivePage
                }
                onClick={() => onPageChange(item)}
              >
                {item}
              </button>
            );
          })}
          <button
            className={`${styles.paginationButton} ${
              !movies.HasNextPage ? styles.disabledButton : ""
            }`}
            onClick={() => onPageChange(activePage + 1)}
            disabled={!movies.HasNextPage}
          >
            Next
          </button>
        </footer>
      ) : null}
    </div>
  );
};

export default withAuth(Movies);
