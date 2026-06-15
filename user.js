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
      const verified = bcrypt.compare(password, user.password);
      if (verified) return user;
      else throw new Error("wrong password");
    } else throw new Error("wrong username");
  }

  async getAll() {
    return await UserModel.find();
  }

  save() {}
}

module.exports = User;
