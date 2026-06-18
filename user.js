const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  username: { type: String },
  password: { type: String },
  role: { type: String },
});

const UserModel = mongoose.model("users", userSchema);

class User {
  constructor(username, password, role) {
    this.username = username;
    this.password = password;
    this.role = role;
  }

  async getUser(username, password) {
    const user = await UserModel.find({ username: username });
    if (user) {
      const verified = bcrypt.compareSync(password, user.password);
      if (verified) return user;
      else throw new Error("wrong password");
    } else throw new Error("wrong username");
  }
  async getUserByUsername(username) {
    return await UserModel.findOne({ username: username });
  }
  async getAll() {
    return await UserModel.find();
  }

  save() {
    const hashedPassword = bcrypt.hashSync(this.password, 8);
    const newUser = new UserModel({
      username: this.username,
      password: hashedPassword,
      role: this.role,
    });
    newUser.save();
  }

  async updateUser() {
    const updateUser = {
      username: this.username,
      password: bcrypt.hashSync(this.password, 8),
      role: this.role,
    };
    await UserModel.updateOne({ username: this.username }, updateUser);
    return updateUser;
  }

  async deleteUser(username) {
    const user = await UserModel.find({ username: username });
    if (user) return await UserModel.deleteOne({ username: username });
  }
}

module.exports = User;
