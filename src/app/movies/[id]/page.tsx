"use client";
import React from "react";

import MovieForm from "@/components/MovieForm";
import withAuth from "@/components/withAuth";
interface EditMovieProps {
  params: {
    id: string;
  };
}
const EditMovie = ({ params }: EditMovieProps) => {
  const { id } = params;

  return <MovieForm movieId={id}></MovieForm>;
};

export default withAuth(EditMovie);
