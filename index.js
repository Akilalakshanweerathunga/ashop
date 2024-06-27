var Express = require("express");
var MongoClient=require("mongodb").MongoClient;
var cors=require("cors");
const multer=require("multer");
const { request } = require("http");

var app=Express();
app.use(cors());

var CONNECTION_STRING="mongodb+srv://wbakilalakshan:FRT6Bl3xZZj9wfpK@ashop.xpar7za.mongodb.net/?retryWrites=true&w=majority&appName=Ashop";

var DATABASE="ashop_data";
var database;

app.listen(5038,()=>{
    MongoClient.connect(CONNECTION_STRING,(error,client)=>{
        database=client.db(DATABASE);
        console.log("Mongo DB Connection Successful")
    });
})
app.get('/api/Ashop/AddNotes',multer().none(),(request,response)=>{
    database.collection("product").count({},function(error,numOfDocs) {
        database.collection("product").insertOne({
            id:(numOfDocs+1).toString(),
            description:request.body.newNotes
        });   
        response.json("Added Successfully"); 
    })
})
app.post('/api/Asop/DeleteNotes',(request,response)=>{
    database.collection("product").deleteOne({
        id:request.query.id
    });
    response.json("Delete Successfully");
})