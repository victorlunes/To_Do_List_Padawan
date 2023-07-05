import User from "../models/User.js";

const createUserSevice = (body) => User.create(body);

const findAllUserService = () => User.find();

const findByIdUserService = (idUser) => User.findById(idUser);

const updateUserService = (
  id,
  name,
  email,
  password,
) =>
  User.findOneAndUpdate(
    {
      _id: id,
    },
    {
      name,
      email,
      password,
    },
    {
      rawResult: true,
    }
  );

export default {
  createUserSevice,
  findAllUserService,
  findByIdUserService,
  updateUserService,
};