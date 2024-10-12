import axios from "./axiosInstance";

interface Movie {
  id?: string;
  title: string;
  year: number;
  poster: string; // Assuming poster is a URL string
}

export const fetchMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get<Movie[]>("/movies");
    return response.data;
  } catch (error) {
    throw new Error("Fetching movies failed");
  }
};

export const createMovie = async (movieData: FormData): Promise<Movie> => {
  try {
    const response = await axios.post<Movie>("/movies", movieData);
    return response.data;
  } catch (error) {
    throw new Error("Creating movie failed");
  }
};

export const updateMovie = async (
  id: string,
  movieData: Partial<Movie>
): Promise<Movie> => {
  try {
    const response = await axios.put<Movie>(`/movies/${id}`, movieData);
    return response.data;
  } catch (error) {
    throw new Error("Updating movie failed");
  }
};

export const deleteMovie = async (id: string): Promise<void> => {
  try {
    await axios.delete(`/movies/${id}`);
  } catch (error) {
    throw new Error("Deleting movie failed");
  }
};
