"use client";
import React from "react";

import MovieForm from "@/components/MovieForm";
import withAuth from "@/components/withAuth";

const CreateMovie = () => {
  return <MovieForm></MovieForm>;
};

export default withAuth(CreateMovie);
