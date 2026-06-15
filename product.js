let products = [];

class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  getAll() {
    return products;
  }
  getProductById(id) {
    return products.find((x) => x.id === id);
  }
  save() {
    products.push(this);
    return this.getAll();
  }
  update() {
    const product = products.find((x) => x.id === this.id);
    if (product) {
      product.name = this.name;
      product.price = this.price;
      return product;
    } else return "item not found";
  }
  delete(id) {
    const index = products.findIndex((x) => x.id === id);
    if (index > -1) {
      products.splice(index, 1);
      return products;
    } else return "item not found";
  }
}
module.exports = Product;

products.push(new Product(1, "aradom", 12));
products.push(new Product(2, "sofia", 21));
