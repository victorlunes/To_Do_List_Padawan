import userService from "../services/user.service.js";

const create = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send({
        message: "Adicione as informações validas !!!",
      });
    }

    const user = await userService.createUserSevice(req.body)
      .catch((err) => console.log(err.message));

    if (!user) {
      return res.status(400).send({
        message: "Erro para criar usuario !!!",
      });
    }

    res.status(201).send({
      message: "Usuario criado com sucesso !!!",
      user: {
        id: user.id,
        name,
        email,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  try {
    const users = await userService.findAllUserService();

    if (users.length === 0) {
      return res.status(400).send({
        message: "Não há usuários registrados !!!",
      });
    }

    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findById = async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { id } = req.params;

    if (!name && !email && !password) {
      res.status(400).send({
        message: "Envie pelo menos um campo para atualizar o usuário !!!",
      });
    }

    await userService.updateUserService(id, name, email, password);

    return res.send({ message: "Usuario atualizado com sucesso !!!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default { create, findAll, findById, update };