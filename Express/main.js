var express = require("express");
var app = express();
app.use(express.json());
var cors = require("cors");
app.use(cors());

app.get("/", (request, response) => {
  response.json({ message: "Gopi" });
});

app.post("/", (request, response) => {
  response.json({ message: "Batman Gopi" });
});
app.post("/logins", (request, response) => {
  // let email = request["query"]["email"];
  // let pass = request["query"]["password"];
  let { email, password } = request["query"];

  if (email == "admin@gmail.com" && password == "admin") {
    response.json({ Message: "You have logged in success" });
  } else {
    response.json({ Message: "Credentials failed" });
  }
});

//   response.json({ email: email, password: pass });
// });

app.post("/register", (request, response) => {
  let { name, email, password, address } = request.body;
  if (!name || !email || !password || !address) {
    response.json({ message: "Enter all the details" });
  } else {
    response.json({ message: "Register Successfully" });
  }
});

app.post("/add", (request, response) => {
  let { num1, num2 } = request.body;
  if (!num1 || !num2) {
    response.json({ message: "Enter 2 Values" });
  } else {
    response.json({ value: num1 + num2 });
  }
});

const { MongoClient, ObjectId } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb+srv://igopi170:akash170@cluster0.cd5na.mongodb.net/";
const client = new MongoClient(url);

// Database Name
const dbName = 'office';

app.post("/createTeacher", async (req, res) => {
  let body = req.body;
  let data = {
    name: body["name"],
    email: body["email"],
    password: body["password"],
    address: body["address"],
    mobile_no: body["mobile_no"],
  };
  await client.connect();
  let db = client.db("office");
  await db.collection("teachers").insertOne(data);
  res.status(200).json({ message: "Created New Teacher Record!!" });
});
app.get("/listTeacher" , async(req,res) => {
  await client.connect();
  //select the database from mongoDB server0
  let db = client.db('office');
  const data = await db.collection("teachers").find({}).toArray();
  res.status(200).json(data)
});

app.get("/listempbyname/:name", async (req,res) => {
  await client.connect();
  let {name} = req.params;
  let db = client.db('office');
  let list = await db.collection("teachers").find({"name" : name}).toArray();
  res.status(200).json(list)
});
var jwt = require("jsonwebtoken");

app.post("/login", async (req, res) => {
  await client.connect();
  let { name, password } = req.body;
  let db = client.db("office");
  const teachers = await db
    .collection("teachers")
    .find({ name: name, password: password })
    .toArray();
  if (teachers.length > 0) {
    var token = jwt.sign({ name: teachers[0]["name"] }, "SECRET");
    res.json({ message: "Login Successful", token: token });
  } else {
    res.status(401).json({ error: "Password incorrect" });
  }
});



app.get("/filter", async (req,res) => {
  await client.connect();
  let db = client.db('office');
  var filterList = {};
  let{name,email,mobile_no} = req.query;
  if(name != undefined && name !=''){
    filterList['name'] = name;
  }
  else if(email != undefined && email!=''){
    filterList['email'] = email;
  }
  else if(mobile_no != undefined && mobile_no != '' ){
    filterList['phone'] = mobile_no;

  }
  let list = await db.collection("teachers").find(filterList).toArray();
  res.json(list);
});


app.delete("/deleteUserName",async (req,res) => {
  await client.connect();
  let db = client.db('office');

  let { name } = req.query;
  await db.collection("teachers").deleteOne({name : name});
  res.json({"msg": "User Deleted"});
  
});

app.put("/updatepwd" , async (req,res) => {
  let {name , password} = req.query;
  await client.connect();
  let db = client.db("office");
  await db.collection("teachers").updateOne({"name" : name},{$set: {"password": password}});
  res.json({"msg": "Password is updated!!"})
  
});

app.post("/updateEmail" , async (req,res) => {
  let {name , email} = req.query;
  await client.connect();
  let db = client.db("office");
  await db.collection("teachers").updateOne({"name" : name},{$set: {"email": email}});
  res.json({"msg": "Email  is updated!!"})
  
});
app.get("/getById" , async(req,res) => {
  let{id} = req.query;
  await client.connect();
  let db = client.db("office");
  let data = await db.collection("teachers").find({"_id":new ObjectId(id) }).toArray();
  res.json(data)
})
app.listen(8080);
