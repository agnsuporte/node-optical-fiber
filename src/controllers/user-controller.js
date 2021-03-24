const jwt = require('jsonwebtoken');

const { User, Project } = require('../database/models');

module.exports = {
  async index(request, response) {
    const { userAuth } = request;

    try {
      const users = await User.findAll({
        order: [['createdAt', 'DESC']],
        where: { id: userAuth.id },
        attributes: ['id', 'userName', 'userUsername', 'userEmail'],
        include: [
          {
            model: Project,
            attributes: ['id', 'projectName'],
          },
        ],
      });

      return response.status(200).json(...users);
    } catch (error) {
      return response.status(500).json(error);
    }
  },

  async sign(request, response) {
    const { userEmail, userPassword } = request.body;

    try {
      const user = await User.findOne({
        where: { userEmail },
      });

      if (user === null) {
        return response.status(401).json({ signAt: false });
      }

      const isAuth = User.compareHash(user.userPassword, userPassword);

      if (isAuth) {
        const _user = {
          id: user.id,
          name: user.userName,
          username: user.userUsername,
          email: user.userEmail,
        };

        const secret = process.env.JWT_SECRET_PRIVATE_KEY;
        const token = jwt.sign({ ..._user }, secret, { expiresIn: '1h' });

        return response.status(200).json({ ..._user, token });
      }
    } catch (error) {
      return response.status(500).json(error);
    }
    return response.status(401).json({ signAt: false });
  },

  async create(request, response) {
    const {
      userName, userUsername, userEmail, userPassword
    } = request.body;

    try {
      const user = await User.create({
        userName,
        userUsername,
        userEmail,
        userPassword,
      });
      return response.status(200).json({
        createAt: true,
        user,
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
    const {
      userName, userUsername, userEmail, userPassword
    } = request.body;

    // eslint-disable-next-line no-new-object
    const data = new Object();

    if (userName) data.userName = userName;
    if (userUsername) data.userUsername = userUsername;
    if (userEmail) data.userEmail = userEmail;
    if (userPassword) data.userPassword = userPassword;

    try {
      const user = await User.update(data, { where: { id } });
      const result = user > 0;
      return response.status(200).json({ updateAt: result, user });
    } catch (error) {
      return response.status(401).json({ updateAt: false, error });
    }
  },

  async delete(request, response) {
    const { id } = request.params;

    try {
      await User.destroy({
        where: { id },
      });
    } catch (error) {
      return response.status(401).json(error);
    }

    return response.status(204).json({ message: 'Usuário excluído' });
  },
};
