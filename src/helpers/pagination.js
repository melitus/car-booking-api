/* eslint-disable import/prefer-default-export */
export const getPagingData = (foundCars, totalCarsCount, pageNumber, pageSize) => {
  const response = {
    cars: foundCars,
    carCounts: totalCarsCount,
    currentPage: pageNumber,
    hasNextPage: pageSize * pageNumber < totalCarsCount,
    hasPreviousPage: pageNumber > 1,
    nextPage: pageNumber + 1,
    previousPage: pageNumber - 1,
    lastPage: Math.ceil(totalCarsCount / pageSize),
  };
  return response;
};
