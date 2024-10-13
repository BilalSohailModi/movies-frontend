"use client";
import React from "react";

import MovieForm from "@/app/components/MovieForm";
import withAuth from "@/app/components/withAuth";

const CreateMovie = () => {
  return <MovieForm></MovieForm>;
};

export default withAuth(CreateMovie);
