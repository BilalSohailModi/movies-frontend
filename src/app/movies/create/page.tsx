"use client";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "../../styles/CreateMovie.module.css";

const CreateMovie = () => {
  const [movieTitle, setMovieTitle] = useState("");
  const [publishingYear, setPublishingYear] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file)); // Generate a preview URL
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    console.log("Submitting:", { movieTitle, publishingYear, imageFile });
  };

  const handleCancel = () => {
    setMovieTitle("");
    setPublishingYear("");
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create a new movie</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Drag and Drop Area */}
        <div {...getRootProps()} className={styles.dropzone}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the image here...</p>
          ) : imagePreview ? (
            <img
              src={imagePreview}
              alt="Movie Preview"
              className={styles.imagePreview}
            />
          ) : (
            <p>Drop an image here</p>
          )}
        </div>

        {/* Form Inputs */}
        <div className={styles.formInputs}>
          <input
            type="text"
            placeholder="Title"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
            className={styles.inputField}
          />
          <input
            type="number"
            placeholder="Publishing year"
            value={publishingYear}
            onChange={(e) => setPublishingYear(e.target.value)}
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

export default CreateMovie;
