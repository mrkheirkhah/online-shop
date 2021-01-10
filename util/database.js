const e = require("express");
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = () => {
  return new Promise((resolve, reject) => {
    mongoClient
      .connect(
        "mongodb://127.0.0.1:27017/?compressors=zlib&readPreference=primary&gssapiServiceName=mongodb&appname=MongoDB%20Compass&ssl=false"
      )
      .then((client) => {
        console.log("mongo connected");
        _db = client.db("shop");
        resolve();
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

const getDB = () => {
  if (_db) {
    return _db;
  }

  throw "no DB connection";
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
