import mongoose from "mongoose";
import userService from "../services/user.service.js";

export const validId = (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Id Invalido !!!" });
  }
  next();
};

export const validUser = async (req, res, next) => {
  const id = req.params.id;

  const user = await userService.findByIdUserService(id); 

  if (!user) {
    return res.status(400).send({
      message: "Usuario não encontrado !!!",
    });
  }

  req.id = id;
  req.user = user;

  next();
};