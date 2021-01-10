const mongodb = require("mongodb");
const getDB = require("../util/database").getDB;

class Product {
  constructor(title, description, price, imageUrl) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDB();
    db.collection("products")
      .insertOne(this)
      .then(function (result) {
        // process result
        console.log(result);
      });
  }

  static fetchAll() {
    const db = getDB();
    return db.collection("products").find({}).toArray();
  }

  static findById(id) {
    const db = getDB();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectID(id) })
      .next();
  }

  static update(id, { title, description, price, imageUrl }) {
    const db = getDB();
    return db.collection("products").updateOne(
      { _id: new mongodb.ObjectID(id) },
      {
        $set: { title, description, price, imageUrl },
      }
    );
  }

  static deleteByID(id) {
    const db = getDB();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectID(id) });
  }
}

// const Product = sequelize.define('product', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

module.exports = Product;
