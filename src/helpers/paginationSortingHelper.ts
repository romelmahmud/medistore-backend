type IOptions = {
  page?: number | string;
  limit?: number | string;
  sortBy?: string;
  sortOrder?: "desc" | "asc";
};

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: "desc" | "asc";
};

export const paginationSortingHelper = (options: IOptions): IOptionsResult => {
  const page: number = Number(options.page) || 1;
  const limit: number = Number(options.limit) || 12;
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy || "createdAt";
  const sortOrder: "desc" | "asc" =
    options.sortOrder === "asc" ? "asc" : "desc";

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
