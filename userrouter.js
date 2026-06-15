const express = require("express");
const router = express.Router();
const userController = require("./usercontroller");

router.post("/login", userController.login);
router.post("/signup", userController.signUp);
router.get("/:username", userController.getUser);
router.put("/:username", userController.updateUser);
router.delete("/:username", userController.deleteUser);

module.exports = router;
