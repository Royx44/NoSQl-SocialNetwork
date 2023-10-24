const { User } = require('../models');

const userCount = async () => {
  const numberOfUsers = await User.estimatedDocumentCount();
  return numberOfUsers;
};

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      const userCountValue = await userCount();

      res.json({
        users,
        userCount: userCountValue,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async getOneUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userid }).select('-password');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userid });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json({ message: 'User deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userid },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },
};
