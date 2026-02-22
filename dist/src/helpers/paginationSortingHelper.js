"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationSortingHelper = void 0;
const paginationSortingHelper = (options) => {
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 12;
    const skip = (page - 1) * limit;
    const sortBy = options.sortBy || "createdAt";
    const sortOrder = options.sortOrder === "asc" ? "asc" : "desc";
    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder,
    };
};
exports.paginationSortingHelper = paginationSortingHelper;
//# sourceMappingURL=paginationSortingHelper.js.map