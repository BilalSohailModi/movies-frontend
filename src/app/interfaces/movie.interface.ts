export interface Movie {
  id?: string;
  title: string;
  publishingYear: number;
  poster: string; // Assuming poster is a URL string
}

export interface CreateMovie {
  title: string;
  publishingYear: number;
  poster: number[]; // Assuming poster is a URL string
}



export interface iPagintedResults<T> {
  HasPreviousPage: boolean;
  HasNextPage: boolean;
  PageIndex: number;
  PageSize: number;
  TotalPages: number;
  TotalCount: number;
  ThisCount: number;
  PageResult: T[];
}

export interface iPagintionQuery {
  offset: number;
  limit: number;
  getAll?: "true" | "false";
  search?: string;
  select: string;
}

