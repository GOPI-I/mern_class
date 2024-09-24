var express = require('express');
var router = express.Router();

const { MongoClient, ObjectId } = require('mongodb')
const url = "mongodb+srv://igopi170:akash170@cluster0.cd5na.mongodb.net/";
const client = new MongoClient(url);

const dbName = "product-review";


router.get("getAllProducts", (req,res) => {
    let productList = [
        {"name" : "product1"},
        {"name" : "product2"},
        {"name":"product3"},
        {"name":"product45"}
    ]
});

module.exports = router


