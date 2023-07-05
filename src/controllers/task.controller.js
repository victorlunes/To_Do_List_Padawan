import {
  createService,
  findAllService,
  byUserService,
  findByIdService,
  updateService,
  eraseService,
} from "../services/task.service.js";

export const create = async (req, res) => {
  try {
    const { title, describe, checked } = req.body;

    if (!title || !describe) {
      res.status(400).send({
        message: "Espero que coloque todas as informações validas !!! ",
      });
    }

    await createService({
      title,
      describe,
      checked,
      user: req.userId,
    });

    res.send(201);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const findAll = async (req, res) => {
  try {
    const tasks = await findAllService();

    if (tasks.length === 0) {
      return res.status(400).send({
        message: "Não tem nenhuma Taks feita !!!",
      });
    }

    res.send(tasks);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const byUser = async (req, res) => {
  try {
    const id = req.userId;
    const task = await byUserService(id);

    return res.send({
      results: task.map((item) => ({
        id: item._id,
        title: item.title,
        describe: item.describe,
        checked: item.checked,
        name: item.user.name,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { title, describe, checked } = req.body;
    const { id } = req.params;

    if (!title && !describe && !checked) {
      res.status(400).send({
        message: "Preencha todos os campos para atualizar !!!",
      });
    }

    const task = await findByIdService(id);

    if (String(task.user._id) !== req.userId) {
      return res.status(400).send({
        message: "Você não pode atualizar esta Task !!!",
      });
    }

    await updateService(id, title, describe, checked);

    return res.send({ message: "Task atualizada com sucesso !!!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const erase = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await findByIdService(id);

    if (String(task.user._id) !== req.userId) {
      return res.status(400).send({
        message: "Você não pode deletar esta Task !!!",
      });
    }

    await eraseService(id);

    return res.send({ message: "Task deletada com sucesso !!!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};