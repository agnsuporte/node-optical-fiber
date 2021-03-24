const { Cable, Project } = require('../database/models');

module.exports = {
  async createModel(request, response) {
    let message = { createAt: true, texto: 'Sucesso!' };
    try {
      await Cable.sync({ force: true });
    } catch (error) {
      message = { createAt: false, error };
      return response.status(401).json(message);
    }
    return response.status(200).json(message);
  },

  async index(request, response) {
    const cables = await Cable.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Project,
          attributes: ['project_name'],
        },
      ],
    });
    return response.json(cables);
  },

  async find(request, response) {
    const { id } = request.params;

    try {
      const cable = await Cable.findOne({
        where: { id },
        include: [
          {
            model: Project,
            attributes: ['project_name'],
          },
        ],
      });
      if (cable === null) {
        return response.status(404).json({ findAt: false });
      }
      return response.status(200).json({ findAt: true, data: cable });
    } catch (error) {
      return response.status(400).json({ findAt: false, error });
    }
  },

  async create(request, response) {
    const { cable_name, ProjectId, cable_capacity } = request.body;

    try {
      const cable = await Cable.create({
        ProjectId,
        cable_name,
        cable_capacity,
      });
      return response.status(200).json({
        createAt: true,
        data: { cable },
      });
    } catch (err) {
      return response.status(401).json({
        createAt: false,
        error: err,
      });
    }
  },

  async delete(request, response) {
    const { id } = request.params;

    try {
      await Cable.destroy({
        where: { id },
      });
      return response.status(204).json({ deleteAt: true });
    } catch (err) {
      return response.status(401).json({ deleteAt: false, error: err });
    }
  },

  async update(request, response) {
    const { id } = request.params;
    const { name, capacity } = request.body;

    try {
      const cable = await Cable.update({ name, capacity }, { where: { id } });
      return response.status(200).json({ updateAt: true, data: cable });
    } catch (err) {
      return response.status(401).json({ updateAt: false, erro: err });
    }
  },
};
