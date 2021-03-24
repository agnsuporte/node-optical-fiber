const jwt = require('jsonwebtoken');

module.exports = {
  async index(req, res) {
    try {
      if (req.headers.authorization) {
        const secret = process.env.JWT_SECRET_PRIVATE_KEY;
        const [bearer, token] = req.headers.authorization.split(' ');

        if (!bearer) return res.status(200).json({ isToken: false });

        jwt.verify(token, secret, (error, data) => {
          if (error) {
            return res.status(200).json({ isToken: false });
          }
          return data;
        });
        return res.status(200).json({ isToken: true });
      }
      return res.status(200).json({ isToken: false });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

};
