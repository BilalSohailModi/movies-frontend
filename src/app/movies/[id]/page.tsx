"use client";
import React from "react";

import MovieForm from "@/app/components/MovieForm";
import withAuth from "@/app/components/withAuth";
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
