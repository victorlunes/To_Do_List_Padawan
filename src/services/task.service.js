import Task from "../models/Task.js"

export const createService = (body) => Task.create(body);

export const findAllService = () => Task.find();

export const byUserService = (id) =>
  Task.find({ user: id }).sort({ _id: -1 }).populate("user");

export const findByIdService = (id) => Task.findById(id).populate("user");

export const updateService = (id, title, describe, checked) =>
  Task.findOneAndUpdate(
    { _id: id },
    { title, describe, checked },
    {
      rawResult: true,
    }
  );

export const eraseService = (id) => Task.findByIdAndDelete({ _id: id });