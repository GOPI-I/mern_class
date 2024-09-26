var express = require('express');
var router = express.Router();
const { Mongodb,MongoClient,ObjectId} = require('mongodb');
var router = express.Router();
// Mongodb.ObjectID
const mongodbUrl = "mongodb+srv://igopi170:akash170@cluster0.cd5na.mongodb.net/";
const mongoDb = new MongoClient(mongodbUrl);
// http://localhost:8080/admin/login
router.post("/login",(req,res)=>{
    let{email,password} = req.body;

})

// http://localhost:8080/admin/getUnApprovedList
router.get("/getUnApprovedList",async(req,res)=>{
    const db = mongoDb.db('product-review');
    let list = await  db.collection("product").find({"isApproved":"0"}).toArray();
    res.json(list);
    
})

// http://localhost:8080/admin/approveReview
router.post("/approveReview",async(req,res)=>{
    try {
        let{id} = req.body;
        const db = mongoDb.db('product-review');
        await  db.collection("product").updateOne({"_id":ObjectId.createFromHexString(id)},{$set:{"isApproved":"1"}});
        res.json({"msg":"approved!!!"})
        
    } catch (e) {
        res.status(400).json({msg:e})
    }
    
})

module.exports = router;