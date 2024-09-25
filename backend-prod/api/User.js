var express = require("express");
var router = express.Router();

const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb+srv://igopi170:akash170@cluster0.cd5na.mongodb.net/";
const client = new MongoClient(url);


const dbName = "product-review";

router.post("/login" , async (req,res) => {
  try {
    let {email , password} =req.body;
    res.json({msg:"login test"});
  } catch (e) {
    res.status(400).json({msg:e});
    
  }
  
})

router.post("/login", async (req, res) => {
  await client.connect();
  let db = client.db(dbName);
  let { name, password } = req.body;
  res.json({ msg: "Login Success" });
});

router.post("/register", async (req, res) => {
  await client.connect();
  let db = client.db(dbName);
  let { name, password, email, mobile } = req.body;
  res.json({ msg: "Login test " });
});

module.exports = router;
