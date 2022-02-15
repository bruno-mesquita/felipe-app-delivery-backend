export const createPagination = (page: number, limit = 15) => ({
  limit,
  offset: page * limit,
});
