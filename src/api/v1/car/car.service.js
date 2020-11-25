import { getPagination, getPagingData } from '../../../helpers/pagination';
import Car from './car.model';

const getAllCars = async (params) => {
  const pageNumber = Math.floor(Number(params.pagenumber));
  const pageSize = Math.floor(Number(params.pagesize));
  const { limit, offset } = getPagination(pageNumber, pageSize);
  const searchQuery = { where: limit, offset };
  const foundCars = await Car.findAndCountAll(searchQuery);
  const response = getPagingData(foundCars, pageNumber, limit);

  return response;
};

export default {
  getAllCars,
};
