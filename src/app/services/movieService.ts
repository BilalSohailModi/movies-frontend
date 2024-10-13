import {
  CreateMovie,
  iPagintedResults,
  Movie,
} from "../interfaces/movie.interface";
import axios from "./axiosInstance";

export const fetchMovies = async (data: {
  offset: number;
  limit: number;
}): Promise<iPagintedResults<Movie>> => {
  try {
    const response = await axios.get<Movie[]>("/movie", {
      params: data,
    });
    return response.data;
  } catch (error) {
    throw new Error("Fetching movies failed");
  }
};

export const createMovie = async (movieData: FormData): Promise<Movie> => {
  try {
    const response = await axios.post<Movie>("/movie", movieData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Creating movie failed");
  }
};

export const getSingleMovie = async (movieId: string): Promise<Movie> => {
  try {
    const response = await axios.get<Movie>(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("fetching movie failed");
  }
};

export const updateMovie = async (
  id: string,
  movieData: FormData
): Promise<Movie> => {
  try {
    const response = await axios.patch<Movie>(`/movie/${id}`, movieData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Updating movie failed");
  }
};
