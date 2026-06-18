const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user_id: { type: String },
    products: [
      {
        name: { type: String },
        price: { type: Number },
        quantity: { type: Number },
      },
    ],
    total: { type: Number },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("orders", orderSchema);
class Order {
  constructor(user_id, products) {
    user_id = this.user_id;
    products = this.products;
  }

  async save(products, customer_id) {
    let total = 0;
    products.foreach(
      (product) => (total = total + product.price * product.quantity)
    );

    const newOrder = new orderModel({
      user_id: customer_id,
      products: products,
      total: total,
    });

    await newOrder.save();
    return total;
  }
}

module.exports = Order;
