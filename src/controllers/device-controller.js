const { Device, Project } = require('../database/models');

module.exports = {
  async createModel(request, response) {
    let message = { createAt: true, texto: 'Sucesso!' };
    try {
      await Device.sync({ force: true });
    } catch (error) {
      message = { createAt: false, texto: error };
      return response.status(401).json(message);
    }
    return response.status(200).json({ message });
  },

  async index(request, response) {
    const devices = await Device.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Project,
          attributes: ['project_name'],
        },
      ],
    });
    return response.json(devices);
  },

  async find(request, response) {
    const { id } = request.params;

    try {
      const device = await Device.findOne({
        where: { id },
        include: [
          {
            model: Project,
            attributes: ['project_name'],
          },
        ],
      });
      if (device === null) {
        return response.status(404).json({ findAt: false });
      }
      return response.status(200).json({ findAt: true, data: device });
    } catch (error) {
      return response.status(400).json({ findAt: false, error });
    }
  },

  async create(request, response) {
    const { ProjectId, device_name, device_active } = request.body;

    try {
      const device = await Device.create({
        ProjectId,
        device_name,
        device_active,
      });
      return response.status(200).json({
        createAt: true,
        data: { device },
      });
    } catch (error) {
      return response.status(400).json({
        createAt: false,
        error,
      });
    }
  },

  async delete(request, response) {
    const { id } = request.params;

    try {
      await Device.destroy({
        where: { id },
      });
      return response.status(204).json({ deleteAt: true });
    } catch (err) {
      return response.status(401).json({ deleteAt: false, error: err });
    }
  },

  async update(request, response) {
    const { id } = request.params;
    const { device_name, device_active } = request.body;

    try {
      const device = await Device.update(
        { device_name, device_active },
        { where: { id } }
      );
      return response.status(200).json({ updateAt: true, data: device });
    } catch (error) {
      return response.status(401).json({ updateAt: false, error });
    }
  },
};
