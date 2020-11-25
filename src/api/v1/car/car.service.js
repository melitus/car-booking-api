import { getPagingData } from '../../../helpers/pagination';
import Car from './car.model';

const getAllCars = async (params) => {
  const pageNumber = Math.floor(Number(params.pagenumber));
  const pageSize = Math.floor(Number(params.pagesize));
  const foundCars = await Car.findAll();
  const totalCarsCount = await foundCars.length;

  const finalResult = getPagingData(foundCars, totalCarsCount, pageNumber, pageSize);

  return finalResult;
};

const findPreviousBookingByUser = async (params, userId) => {
  const pageNumber = Math.floor(Number(params.pagenumber));
  const pageSize = Math.floor(Number(params.pagesize));
  const searchQuery = { where: { user_id: userId } };

  const previousBookingByUser = await Car.findAll(searchQuery);
  const totalPreviousCarsCount = await previousBookingByUser.length;

  const finalResult = getPagingData(previousBookingByUser, totalPreviousCarsCount, pageNumber, pageSize);

  return finalResult;
};

const bookACar = async (inputData) => {
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
