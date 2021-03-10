// const Project = require("../db/models/Project");
// const Network = require("../db/models/Network");

const { Network, Project } = require('../database/models')

module.exports = {
  async createModel(request, response) {
    let message = { createAt: true, texto: "Sucesso!" };
    try {
      await Network.sync({ force: true });
    } catch (error) {
      message = { createAt: false, error };
      return response.status(401).json(message);
    }
    return response.status(200).json(message);
  },

  async index(request, response) {
    const networks = await Network.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Project,
          attributes: ["projectName"],
        }
      ],
    });

    return response.json(networks);
  },

  async find(request, response) {
    const { id } = request.params;

    try {
      const project = await Network.findOne({
        where: { id },
        include: [
          {
            model: Project,
            attributes: ["projectName"],
          },
        ],
      });
      if (project === null) {
        return response.status(404).json({ findAt: false });
      }
      return response.status(200).json({ findAt: true, data: project });
    } catch (error) {
      return response.status(400).json({ findAt: false, error });
    }
  },

  async create(request, response) {
    const { ProjectId, networkName } = request.body;

    try {
      const network = await Network.create({
        ProjectId,
        networkName,
      });
      return response.status(200).json({
        create_at: true,
        data: { network },
      });
    } catch (error) {
      return response.status(401).json({
        createAt: false,
        error,
      });
    }
  },

  async delete(request, response) {
    const { id } = request.params;

    try {
      await Network.destroy({
        where: { id },
      });
      return response.status(204).json({ deleteAt: true });
    } catch (error) {
      return response.status(401).json({ deleteAt: false, error });
    }
  },

  async update(request, response) {
    const { id } = request.params;
    const { networkName } = request.body;

    try {
      const project = await Network.update({ networkName }, { where: { id } });
      return response
        .status(200)
        .json({ updateAt: true, data: { networkName } });
    } catch (err) {
      return response.status(401).json({ updateAt: false, erro: err });
    }
  },
};
