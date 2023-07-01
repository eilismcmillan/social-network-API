// const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  // get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find()
      .select("-__v")

      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user
  async getUserById(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
      .select("-__v");

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json({
        user,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // create a new user
  async createNewUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // update user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: "No user with this id!" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      res.json({ message: "User successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // add new friend
  async addFriend(req, res) {
    try {
      const user = User.findOneAndUpdate(
        {
          _id: req.params.userId,
        },
        {
          $addToSet: {
            friends: req.params.userId,
          },
        },
        {
          runValidators: true,
          new: true,
        }
      );
      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // delete friend
  async removeFriend(req, res) {
    try {
      const user = User.findOneAndUpdate(
        {
          _id: req.params.userId,
        },
        {
          $pull: {
            friends: req.params.userId,
          },
        },
        {
          runValidators: true,
          new: true,
        }
      );
      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};