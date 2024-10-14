"use client";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import styles from "../styles/MovieForm.module.css";
import {
  createMovie,
  updateMovie,
  getSingleMovie,
} from "@/services/movieService";
import { useRouter } from "next/navigation";
import NotFound from "./NotFound";
import Spinner from "./Spinner";
import { loadingAtom } from "@/jotai/loader.jotai";
import { useAtom } from "jotai";

const dropImg = "/images/drop-img.svg";
interface iMoveForm {
  movieId?: string;
}
const MovieForm = (props: iMoveForm) => {
  const [movieTitle, setMovieTitle] = useState("");
  const [publishingYear, setPublishingYear] = useState<number | undefined>();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [, setLoader] = useAtom(loadingAtom);
  const router = useRouter();
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file)); // Generate a preview URL
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile && !props.movieId) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();

    // Append form data
    formData.append("title", movieTitle);
    formData.append("publishingYear", String(publishingYear));

    if (imageFile) {
      formData.append("poster", imageFile);
    }

    try {
      setLoader(true)
      if (props.movieId) await updateMovie(props.movieId, formData);
      else await createMovie(formData);
      router.push("/movies");
    } catch (error: any) {
      console.error(error?.message);
    }
    setLoader(false)
  };

  const handleCancel = () => {
    setMovieTitle("");
    setPublishingYear(undefined);
    setImageFile(null);
    setImagePreview(null);
    router.push("/movies");
  };

  useEffect(() => {
    const fetchMovie = async (movieId: string) => {
      try {
        setLoader(true)
        const movie = await getSingleMovie(movieId);
        setMovieTitle(movie.title);
        setPublishingYear(movie.publishingYear);
        setImagePreview(movie.poster);
      } catch (error) {
        setNotFound(true);
      }
      setLoader(false)
    };
    if (props.movieId) {
      fetchMovie(props.movieId);
    }
  }, [props.movieId]);

  if (notFound)
    return (
      <NotFound
        title={"404 - Resource Not Found"}
        description={"Sorry, the resource you are looking for does not exist."}
        buttonTitle={"Go to Home"}
        callback={() => router.push("/movies")}
      ></NotFound>
    );
  return (
    <div className={styles.container}>
      <Spinner></Spinner>
      <h1 className={styles.title}>
        {props.movieId ? "Edit" : "Create a new movie"}
      </h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Drag and Drop Area */}
        <div {...getRootProps()} className={styles.dropzone}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>
              <img
                src={dropImg}
                className={styles.dropimage}
                alt="upload icon"
              />
              Drop the image here...
            </p>
          ) : imagePreview ? (
            <img
              src={imagePreview}
              alt="Movie Preview"
              className={styles.imagePreview}
            />
          ) : (
            <p>
              <img
                src={dropImg}
                className={styles.dropimage}
                alt="upload icon"
              />
              Drop an image here
            </p>
          )}
        </div>

        {/* Form Inputs */}
        <div className={styles.formInputs}>
          <input
            type="text"
            placeholder="Title"
            value={movieTitle}
            required
            onChange={(e) => setMovieTitle(e.target.value)}
            className={styles.inputField}
          />
          <input
            type="number"
            placeholder="Publishing year"
            value={publishingYear}
            required
            onChange={(e) => setPublishingYear(parseInt(e.target.value))}
            className={styles.inputField}
          />

          {/* Buttons */}
          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={handleCancel}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MovieForm;
