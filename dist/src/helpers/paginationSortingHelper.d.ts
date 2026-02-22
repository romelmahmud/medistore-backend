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
export declare const paginationSortingHelper: (options: IOptions) => IOptionsResult;
export {};
//# sourceMappingURL=paginationSortingHelper.d.ts.map