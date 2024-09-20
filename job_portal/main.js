var express = require("express");
var app = express();
app.use(express.json());
const fileUpload = require("express-fileupload");

app.use(fileUpload({
  limits:{fileSize: 50 * 1024 * 1024},
}));

var cors = require("cors");
app.use(cors());
app.use('/api/',(req,res,next) =>{
    // reading the header from the header
    let {token} = req.headers;
    if( token == "" || token == undefined){
        res.json({"msg":"pls send the token"})
    } else{
        jwt.verify(token, 'SECRET');
        next();
    }
}); // middlewaere


const { MongoClient, ObjectId } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb+srv://igopi170:akash170@cluster0.cd5na.mongodb.net/";
const client = new MongoClient(url);

// Database Name
const dbName = "jobportal";

app.post("/api/create_jobs",async (req,res) =>{
    let body = req.body;
    let data = {
      name: body["name"],
      company_name: body["company_name"],
      requirements: body["requirements"],
    };
    await client.connect();
    let db = client.db("office");
    await db.collection("job_portal").insertOne(data);
    res.json({ message: "Created a new job !!" });
});

app.get("/api/list_jobs",async (req,res) =>{
    await client.connect();
    let db = client.db("office");
    let data = await db.collection("job_portal").find({}).toArray();
    res.json(data)
});
// app.put("/update_jobs",async (req,res)=>{
//     let {name,requirements} = req.query;
//     await client.connect();
//     let db = client.db("office");
//     await db.collection("job_portal").updateOne({"name" : name},{$set : {"requirements" : requirements}});
//     res.json({"msg": "requirements  is updated!!"})

// });

app.put("/api/update_jobs", async (req, res) => {
    let { id, name, requirements, company_name } = req.body; // Extract the body data correctly
    await client.connect();
    let db = client.db("office");

    // Perform the update using $set
    let result = await db.collection("job_portal").updateOne(
        { "_id": new ObjectId(id) }, // Filter to find by _id
        { $set: { name: name, requirements: requirements, company_name: company_name } } // Update fields
    );

    res.json({ msg: "Job updated successfully!" });
});




// app.delete("/delete_jobs",async(req,res) =>{
//     let{id} = req.query;
//     await client.connect();
//     let db = client.db("office");
//     await db.collection("job_portal").deleteOne({_id : new ObjectId(id)});

//     res.json({"msg": "userName Deleted"});
// });

app.delete("/api/delete_jobs", async (req, res) => {
    let { id } = req.query; // Extract id from query parameters
    await client.connect();
    let db = client.db("office");

    // Convert id from string to ObjectId and delete the job
    let result = await db.collection("job_portal").deleteOne({ "_id": new ObjectId(id) });
    
    res.json({"msg": "sucessfully deleted!!"});
});

var jwt = require('jsonwebtoken');


app.post("/login" , async(req,res) => {
  await client.connect();
  let {name ,password} = req.body;
  let db = client.db('office');
  let teachers = await db.collection("teachers").find({"name":name,"password":password}).toArray();
//   const teacher = teachers[0];
  // if(teacher.password === password){
  //   res.status(200).json({message: "Login Succesfully!!!"});
  // }else{
  //   res.status(401).json({message:"veliya poda!!"});
  // }

  if(teachers.length > 0){
    var token = jwt.sign({ "name": teachers[0]['name'] }, 'SECRET');
    res.json({message : "Login Successfully","token":token});
  }else{
    res.status(400).json({error : "Failed to Login"});
  }

});
app.post("/register", async (req, res) => {
    let body = req.body;
    let data = {
      name: body["name"],
      email: body["email"],
      password: body["password"],
    };
    await client.connect();
    let db = client.db("office");
    await db.collection("teachers").insertOne(data);
    res.status(200).json({ message: "Created New Register for Job !!" });
  });
  app.post("/upload",async(req,res)=>{
    let file = req.files.img;
    let uploadPath = __dirname + '/uploads/' + file.name;

    file.mv(uploadPath, function(err){
        if(err){
            return res.status(500).send(err);
        }else{
            res.send("file uploaded");
        }
    })

})


app.listen(8080);