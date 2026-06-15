const { response } = require("express");
const Product = require("./product");

exports.getAll = (req, res) => {
  console.log(req.query.id);
  let product = new Product();
  let products = product.getAll();
  res.send(JSON.stringify(products));
};
// exports.getbyId = (req, res) => {
//   const product = new Product();
//   console.log(req.query.id);
//   const products = product.getProductById(parseInt(req.query.id));
//   res.send(products);
// };

exports.getByIdparam = (req, res) => {
  const product = new Product();
  const products = product.getProductById(parseInt(req.params.id));
  res.send(products);
};
exports.addProduct = (req, res) => {
  const { id, name, price } = req.body;
  const newProduct = new Product(id, name, price);
  const duplicateproducts = newProduct.getProductById(id);
  if (duplicateproducts) res.send("its a duplicate");
  else {
    const products = newProduct.save();
    res.send(JSON.stringify(products));
  }
};

exports.updateProduct = (req, res) => {
  const { id, name, price } = req.body;
  const updateProduct = new Product(id, name, price);
  const updated = updateProduct.update();
  res.send(updated);
};

exports.deleteById = (req, res) => {
  const deleteProduct = new Product();
  const products = deleteProduct.delete(parseInt(req.params.id));
  res.send(JSON.stringify(products));
};
