const express = require("express");
const router = express.Router();
const productController = require("./productController");
const userController = require("./usercontroller");

router.use(userController.authorize);
router.get("/", productController.getAll);
//router.get("/", productController.getbyId); this can confuse the route with the above one since they
//look similar eventhough the latter one is with query
router.post("/add", productController.middleware, productController.addProduct);
//localhost:3000/product/2/sofia/price
router.get("/:id/:name/:price", productController.getByIdparam);

router.put(
  "/:id",
  productController.middleware,
  productController.updateProduct
);

router.delete(
  "/:id",
  productController.middleware,
  productController.deleteById
);
module.exports = router;
