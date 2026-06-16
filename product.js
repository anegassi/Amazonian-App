const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    id: { type: Number },
    name: { type: String },
    price: { type: Number },
  },
  { timestamps: true }
);

const productModel = mongoose.model("Products", productSchema);

class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  async getAll() {
    return await productModel.find();
  }

  async getLatestProducts(page, pageSize) {
    const query = {},
      sort = { id: "descending" }; //ascending -1 means descending order, 1 means ascending.
    const offset = (page - 1) * pageSize;
    return await productModel
      .find(query)
      .limit(pageSize)
      .skip(offset)
      .select(exclude)
      .sort(sort);
  }
  async getProductById(id) {
    const documents = await productModel.findOne({ id: id });
    return documents;
  }
  async save() {
    const newProduct = new productModel(this);
    await newProduct.save();
  }
  async update() {
    const product = await this.getProductById(this.id);
    if (product) {
      await ProductModel.updateOne({ id: this.id }, this);
      return true;
    } else {
      return false;
    }
  }
  async delete(productId) {
    const product = await this.getProductById(productId);
    if (product) {
      await productModel.deleteOne({ id: productId });
      return true;
    } else {
      return false;
    }
  }
}
module.exports = Product;
