const express = require("express");
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//We can too use other body-parser as-
/*
app.use(body-parser.json());
app.use(body-parser.urlencoded({ extended: true}));
*/

app.listen(PORT, () => {
    console.log("Server Started at Port:",PORT);
});

//Mimic the Db using an array.
let blogsList = []; //Initalized an empty array.

//This API is Extracting every blogs present in the array.
app.get('/blogs', (req, res) => {
    console.log(req.body); //Since nothing is send inside req.body hence it gives undefined.
    return res.status(200).json({
        data: blogsList,
        success: true
    });
});


//This Api is for creating a blog
app.post('/blogs', (req, res) => {
    // console.log(req.body); //undefined -> because it needs body-parser to convert req.body to json
    // console.log(req.query); //prints the querry passed.

    //After just adding a body parser
    console.log(req.body);
    blogsList.push({
        title: req.body.title, 
        content: req.body.content, 
        id: Math.floor(Math.random() * 1000)
    });

    return res.status(201).json({
        data: req.body,
        success: true
    });
});

//Now without restarting the server we can hit out GET API it will given the data inside the blogList.
//Every time we jut restart our server the blogList will become empty as every time server restarts RAM clears.


//Setting up a GET API for a particular blog
app.get('/blogs/:id', (req, res) => {
    console.log(req.params); //Will give access to the id in the form of key-value pair
    const result = blogsList.filter((blog) => blog.id == req.params.id);
    return res.status(200).json({
        data: result,
        success: true
    });
});



//Setting up a DELETE API for a particular blog
app.delete('/blogs/:id', (req, res) => {
    blogsList = blogsList.filter((blog) => blog.id != req.params.id);
    return res.status(200).json({
        data: blogsList,
        success: true
    });
});