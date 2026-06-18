const express = require("express");
const router = express.Router();
const userController = require("./usercontroller");

router.post("/signup", userController.signUp);

router.post("/login", userController.login);
router.use(userController.authorize);

router.get("/:username", userController.getUser);
router.put("/:username", userController.updateUser);
router.delete("/:username", userController.deleteUser);

module.exports = router;
