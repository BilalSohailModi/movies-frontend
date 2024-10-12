"use client";
import React, { useState } from "react";

interface MovieFormProps {
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
}

const MovieForm: React.FC<MovieFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [publishingYear, setPublishingYear] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !publishingYear || !imageFile) {
      alert("Please fill out all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("publishingYear", publishingYear);
    formData.append("image", imageFile);

    onSubmit(formData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="movie-form">
      <h2>Create a new movie</h2>
      <div className="form-group">
        <label htmlFor="imageUpload" className="image-upload-label">
          Drop an image here
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        {imageFile && <p>{imageFile.name}</p>}
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="Publishing year"
          value={publishingYear}
          onChange={(e) => setPublishingYear(e.target.value)}
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default MovieForm;
