export const getPagination = (page: any, limit: any) => {
  const currentPage = Number(page) || 1;
  const pageSize = Number(limit) || 10;
  const skip = (currentPage - 1) * pageSize;

  return { currentPage, pageSize, skip };
};

export const getPaginationMeta = (
  total: number,
  currentPage: number,
  pageSize: number,
) => {
  return {
    total,
    currentPage,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
    hasNextPage: currentPage < Math.ceil(total / pageSize),
    hasPrevPage: currentPage > 1,
  };
};
