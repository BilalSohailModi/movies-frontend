import React from "react";
import styles from "../styles/Movies.module.css";
import { useRouter } from "next/navigation";
import { Movie } from "@/interfaces/movie.interface";
import Image from "next/image";

const MovieCard = ({ movie }: { movie: Movie }) => {
    const router = useRouter();


    return (
        <div
            className={styles.card}
            key={movie.id}
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
    );
};

export default MovieCard;
