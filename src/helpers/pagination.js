/* eslint-disable import/prefer-default-export */
export const getPagingData = (data, page, limit) => {
  console.log({ data, page, limit });
  const { count: totalCars, rows: cars } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalCars / limit);

  return { totalCars, cars, totalPages, currentPage };
};

export const getPagination = (page, size) => {
  console.log({ page, size });
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};
