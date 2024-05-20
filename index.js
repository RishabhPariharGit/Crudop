//loadenv variables
require('dotenv').config()


// Import Dependencies
const express = require("express");
const connecttoDb = require('./ConnectDb/databasecon')
const Note = require('./modal/note')

//Created an Express app
const app = express();

//configure express app
app.use(express.json());

connecttoDb();
// Routing
app.get('/',(req,res)=>{
    res.send('App listning on port')
})


//posting the data into the database
app.post('/notes',async(req,res) =>{


 //initialized the fields for the routes   
const title = req.body.title;
const body = req.body.body;


//created a note
const note = await Note.create({
    title:title,
    body:body,
});


//selected the format
res.json({note:note});

});


//fetching all the data stored in the database

app.get('/notes', async(req,res)=>{   //fetching all the products from the database

    const notes = await Note.find();
    res.json({notes:notes});
})


app.get('/notes/:id', async(req,res)=>{ //find the single note by its ID

    const noteId = req.params.id;

    const note = await Note.findById(noteId);
    res.json({note:note});
})


app.put('/notes/:id',async(req,res) =>{   //updating the details of the product with the help of the ID

//get the id of the url
const noteID  = req.params.id;

//get the data of the requested body
const title = req.body.title;
const body = req.body.body;

// find and update the record
await Note.findByIdAndUpdate(noteID,{
    title : title,
    body : body,
});

//find the updated ID
const note  = await Note.findById(noteID);


res.json({note:note});


});


app.delete('/notes/:id', async(req,res)=>{  //deleting the data from the database

    const noteId = req.params.id;

    await Note.deleteOne({_id:noteId});

    res.json({succes:"Record deleted Successfully"})

});


//Start our server
app.listen(process.env.PORT);
