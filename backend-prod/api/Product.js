var express = require('express');
var router = express.Router();

const { MongoClient, ObjectId } = require('mongodb')
const url = "mongodb+srv://igopi170:akash170@cluster0.cd5na.mongodb.net/";
const client = new MongoClient(url);

const dbName = "product-review";


router.get("/getAllProducts", async(req,res) => {
    await client.connect();
    let db = client.db(dbName);

    // let productList = [
    //     {"name" : "Sathish Veshti"},
    //     {"name" : "vignesh jetti"},
    //     {"name":"karan baniyan"},
    //     {"name":"akash shirt"},
    //     {"name":"Nithish jeans"}
    // ];
    let list = await db.collection("user").find().sort({name:1}).toArray();
    // let list = await db.collection("user").find().skip(1).limit(10).sort({name:1}).toArray();
    res.json(list);
    console.log(list);
});

router.post("/addReview",async (req,res) => {
    let{category,reviewText,name} = req.body;

    let data = {
        "name":name,
        "category":category,
        "reviewText":reviewText
    };
    let path = __dirname+"/uploads/"+req.files.img.name;
    req.files.img.mv(path,(err)=>{

    });
    await client.connect();
    let db = client.db(dbName);

    db.collection("product").insertOne(data);
    res.json({msg:"producyt added for review"});
    
    
})

module.exports = router;


