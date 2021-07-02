export const usePage = (page: number, limit = 15) => {
  const offset = page * limit

  return {
    limit,
    offset,
  }
};
