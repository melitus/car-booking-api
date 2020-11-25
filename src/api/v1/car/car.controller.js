import httpStatus from 'http-status';

import CarService from './car.service';

const getAllCars = async (req, res) => {
  const inputData = req.query;
  try {
    const response = await CarService.getAllCars(inputData);
    res.status(httpStatus.OK).json({ success: true, message: 'All cars fetched successfully', data: response });
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: 'Error occurred fetching all cars' });
  }
};

const getAllPreviousBookingByUser = async (req, res) => {
  const inputData = req.query;
  const { userId } = req.params;
  try {
    const response = await CarService.findPreviousBookingByUser(inputData, userId);
    res
      .status(httpStatus.OK)
      .json({ success: true, message: 'All previous booking fetched successfully', data: response });
  } catch (error) {
    res
      .status(httpStatus.UNAUTHORIZED)
      .json({ success: false, message: 'Error occurred fetching all previous booking by user' });
  }
};

const bookACarByUser = async (req, res) => {
  const inputData = req.body;
  try {
    const response = await CarService.bookACar(inputData);
    res.status(httpStatus.OK).json({ success: true, message: 'A car booked successfully', data: response });
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: 'Error occurred while booking a car by user' });
  }
};

export default {
  getAllCars,
  getAllPreviousBookingByUser,
  bookACarByUser,
};
