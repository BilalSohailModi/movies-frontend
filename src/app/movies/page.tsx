"use client";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Movies.module.css";
import { logout } from "../../services/authService";
import { useRouter } from "next/navigation";
import withAuth from "../../components/withAuth";
import { useAtom } from "jotai";
import { userState } from "../../jotai/user.jotai";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { iPagintedResults, Movie } from "../../interfaces/movie.interface";
import { fetchMovies } from "../../services/movieService";
import { CiLogin } from "react-icons/ci";
import EmptyMovieList from "@/components/EmptyMovieList";
import MovieCard from "@/components/MovieCard";
import PaginatationFooter from "@/components/PaginatationFooter";
import { loadingAtom } from "@/jotai/loader.jotai";
import Spinner from "@/components/Spinner";
const logoutIcon = "/images/logout.svg";

const PAGE_LIMIT = 8;
const Movies: React.FC = () => {
  const router = useRouter();
  const [user] = useAtom(userState);
  const [activePage, setActivePage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [movies, setMovies] = useState<iPagintedResults<Movie>>();
  const [, setLoader] = useAtom(loadingAtom);
  const getMovies = async () => {
    try {
      setLoader(true)
      const response = await fetchMovies({
        limit: PAGE_LIMIT,
        offset: (activePage - 1) * PAGE_LIMIT,
      });
      setMovies(response);
    } catch (error) { }
    setLoader(false)
  };
  useEffect(() => {
    getMovies();
  }, [activePage]);

  const onPageChange = (page: number) => {
    if (page == activePage) return;
    setActivePage(page);
  };


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600); // Adjust the breakpoint as needed
    };

    handleResize(); // Check on initial load
    window.addEventListener("resize", handleResize); // Check on resize

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on unmount
    };
  }, []);

  return movies?.PageResult.length === 0 ? (
    <EmptyMovieList />
  ) : (
    <div className={styles.container}>
      <Spinner></Spinner>
      <header className={styles.header}>
        <h1 className={styles.title}>
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
          {!isMobile && (
            <>
              Logout
              <img
                src={logoutIcon}
                className={styles.logoutIcon}
                alt="logout icon"
              />
            </>
          )}
          {isMobile && (
            <img
              src={logoutIcon}
              className={styles.logoutIcon}
              alt="logout icon"
            />
          )}
        </button>
      </header>
      <div className={styles.grid}>
        {movies?.PageResult.map((movie, index) => (
          <MovieCard movie={movie}></MovieCard>
        ))}
      </div>
      {movies ? (
        <PaginatationFooter HasPreviousPage={movies.HasPreviousPage} HasNextPage={movies.HasNextPage} activePage={activePage} TotalCount={movies.TotalCount} PAGE_LIMIT={PAGE_LIMIT} onPageChange={onPageChange}></PaginatationFooter>
      ) : null}
    </div>
  );
};

export default withAuth(Movies);
