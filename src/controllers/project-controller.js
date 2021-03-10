const { Network, Project } = require("../database/models");

module.exports = {
  async index(request, response) {
    const userAuth = request.userAuth;

    try {
      const projects = await Project.findAll({
        order: [["createdAt", "DESC"]],
        where: { UserId: userAuth.id },
        include: [
          {
            model: Network,
            attributes: ["networkName"],
          },
        ],
      });
      return response.status(200).json(projects);
    } catch (error) {
      return response.status(500).json(error);
    }
  },

  async find(request, response) {
    const { id } = request.params;
    const userAuth = request.userAuth;

    try {
      const project = await Project.findOne({
        where: { id, UserId: userAuth.id },
        include: [
          {
            model: Network,
            attributes: ["networkName"],
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
    const userAuth = request.userAuth;
    const { projectName, projectCompany } = request.body;

    try {
      const project = await Project.create({
        projectName,
        projectCompany,
        UserId: userAuth.id,
      });
      return response.status(200).json({
        createAt: true,
        project,
      });
    } catch (error) {
      return response.status(401).json({
        createAt: false,
        error,
      });
    }
  },

  async update(request, response) {
    const { id } = request.params;
    const userAuth = request.userAuth;
    const { projectName, projectCompany } = request.body;

    try {
      const project = await Project.update(
        { projectName, projectCompany },
        { where: { id, UserId: userAuth.id } }
      );

      const result = project > 0 ? true : false;

      return response.status(200).json({ updateAt: result, project });
    } catch (error) {
      return response.status(401).json({ updateAt: false, error });
    }
  },

  async delete(request, response) {
    const { id } = request.params;
    const userAuth = request.userAuth;

    try {
      await Project.destroy({
        where: { id, UserId: userAuth.id },
      });
      return response.status(204).json({ deleteAt: true });
    } catch (error) {
      return response.status(401).json({ deleteAt: false, error });
    }
  },
};
