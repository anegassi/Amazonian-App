const { response } = require("express");
const Product = require("./product");

let dummy = new Product();

exports.middleware = (req, res, next) => {
  if (req.user.role == "admin") next();
  else res.send("you are not authorized");
};

exports.getAll = async (req, res) => {
  if (req.query.latest) {
    const { latest, number } = req.query;
    let products = await dummy.getLatestProducts(latest, number);
    res.send(JSON.stringify(products));
  } else {
    let products = await dummy.getAll();
    res.send(JSON.stringify(products));
  }
};

exports.getByIdparam = async (req, res) => {
  const product = await dummy.getProductById(parseInt(req.params.id));
  if (product) res.send(product);
  else res.send("register the product ");
};
exports.addProduct = async (req, res) => {
  const { id, name, price } = req.body;
  const newProduct = new Product(id, name, price);
  let products = await dummy.getAll();
  let product = products.find((x) => x.id === id);
  if (product) {
    res.send("The product is duplicated");
  }
  const saved = await newProduct.save();
  res.send(saved);
};

exports.updateProduct = async (req, res) => {
  const { id, name, price } = req.body;
  const updateProduct = new Product(id, name, price);
  const updated = await updateProduct.update();
  if (updated) res.send(updateProduct);
  else res.send("this product doesnt exist ");
};

exports.deleteById = async (req, res) => {
  const deleteProduct = new Product();
  const products = await deleteProduct.delete(parseInt(req.params.id));
  res.send(JSON.stringify(products));
};
