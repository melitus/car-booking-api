import { Op } from 'sequelize';

import { getPagination, getPagingData } from '../../../helpers/pagination';
import Car from './car.model';

const getAllCars = async (params) => {
  const pageNumber = Math.floor(Number(params.pagenumber));
  const pageSize = Math.floor(Number(params.pagesize));
  const foundCars = await Car.findAll();
  const totalCarsCount = await foundCars.length;

  const finalResult = {
    cars: foundCars,
    carCounts: foundCars.length,
    currentPage: pageNumber,
    hasNextPage: pageSize * pageNumber < totalCarsCount,
    hasPreviousPage: pageNumber > 1,
    nextPage: pageNumber + 1,
    previousPage: pageNumber - 1,
    lastPage: Math.ceil(totalCarsCount / pageSize),
  };

  return finalResult;
};

const findPreviousBookingByUser = async (params, userId) => {
  const pageNumber = Math.floor(Number(params.pagenumber));
  const pageSize = Math.floor(Number(params.pagesize));
  const condition = userId ? { user_id: { [Op.like]: `%${userId}%` } } : null;
  const { limit, offset } = getPagination(pageNumber, pageSize);
  const searchQuery = { where: { condition }, limit, offset };

  const previousBookingByUser = await Car.findAll(searchQuery);
  const response = getPagingData(previousBookingByUser, pageNumber, limit);

  return response;
};

const bookACar = async (inputData) => {
  console.log({ inputData });
  const bookingPayload = {
    name: inputData.name,
    price: inputData.price,
    user_id: inputData.user_id,
  };
  const newBooking = await Car.create(bookingPayload);
  return newBooking;
};

export default {
  getAllCars,
  findPreviousBookingByUser,
  bookACar,
};
