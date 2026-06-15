const User = require("./user");
const jwt = require("jsonwebtoken");
const PRIVATE_KEY = "cs477-2022";
let dummy = new User();

exports.signUp = async (req, res) => {
  const { username, password, role } = req.body;
  const newUser = new User(username, password, role);
  const users = await newUser.getAll();
  const user = users.find((x) => x.username);
  if (user) {
    res.send("the account already exist ");
  } else {
    newUser.save();
    res.send("saved ");
  }
};

exports.login = async (req, res) => {
  console.log("im here");

  const { username, password } = req.body;
  if (username && password) {
    const user = await dummy.getUser(username, password);
    if (user) {
      const accessToken = jwt.sign(
        { username, role: user.role, id: user._id },
        PRIVATE_KEY,
        { expiresIn: 30000 }
      );
      res.send(accessToken);
    } else res.send("user not found ");
  } else res.send("enter your username and Password");
};
exports.authorize = (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (authHeaders) {
    const token = authHeaders.split(" ")[1];
    jwt.verify(token, PRIVATE_KEY, (err, user) => {
      if (err) res.send("you are forbiden ");
      console.log(user);
    });

    next();
  } else res.send("you are not authorized");
};
