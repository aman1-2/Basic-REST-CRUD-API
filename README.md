# *Basic Of CRUD API Under the RESTful Convention*
- To understand it we will be creating a Blog Server.

<br>

---

## Steps Involved in Creating Or Setting Up a Server.
- *Step-1 ->* Just Create a Folder.

- *Step-2 ->* Inside the Terminal Being in that Folder Run the Command npm init to intialize it and it will create a package.json file with Project information and a package-lock.json which we hold the details about the packages being used inside the Project. 

- *Step-3 ->* Since we are going to create a Server lets just install the Express.js. For it just run the command `npm i express`.

- *Step-4 ->* Now Prepare a file index.js as the server will run this file as its main file.

- *Step-5 ->* Next Step is to Create our Express app for that create an express instance with the command

        const express = require("express");

- *Step-6 ->* After creating an Express instance then just create an express app as

        const app = express();

- *Step-7 ->* The Next Step would come out to launch your app and you can launch it on any PORT we usually use PORT 3000. And `listen()` function is used for launching an app.
    The listen function takes two arguments as the PORT number - (on which we have to launch the server) and an arrow function - (which does some function once the server is launched or setup).
    
        app.listen(PORT, ()=>{
            console.log("Server Started at Port:",PORT);
        });

- *Step-8 ->* Now once we have started our server and made some change in the code it is not that it will automatically will re-start the server we manually have to do it.<br>
    So to avoid such a hectic thing of every time re-starting the server once made a change we install something called as `nodemon` it does the same work automatically when ever detacts any change in the serve code. This concept of automatic restat=rting of the server is too known as - `hot reloading`.<br>
    We can install nodemon by running the command `npm i nodemon` in the terminal.<br>
    Just installing this command won't help to restart our server again on any change.<br>
    Even after installing nodemon if we start our Project as `node index.js` it will run Normally to start a file in nodemon we have a command `nodemon index.js`<br>
    It will throw an error command not found as nodemon is installed inside the working folder in node module not globally therefore either we have to run the command as
    `npx nodemon index.js`.Now it will run the nodemon in the node environment.<br>
    npx -  This command allows you to run an arbitrary command from an npm package (either one installed locally, or fetched remotely)<br><br>
    The other option to could be adding a script to our package.json.

        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "start": "npx nodemon index.js"
        },

        OR

        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "start": "nodemon index.js"
        },
    Then we could run the server with the help of `npm start` command.

**With every Http Request we recieve a code One way is too pass the code inside the json and other is too pass it status which tells the status of the URL after hitting. This status retunrs us the res object on which we apply the json and again gets back the res objct.**
- *Step-8 ->* Now we can Start with our CRUD API's. First one is too fetch a data.
        
        //This API is Extracting every blogs present in the array.
        app.get('/blogs', (req, res) => {
            console.log(req.body); //Since nothing is send inside req.body hence it gives undefined.
            return res.status(200).json({
                data: blogsList,
                success: true
            });
        });

- *Step-9 ->* Lets try to create an API to post a data.

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

**Body-parser ->**

Insalling -> `npm i body-parser`

When a client sends data in an HTTP request, it's often included in the body of the request. The body of an HTTP request can be formatted in different ways, such as JSON, URL-encoded, multipart/form-data, etc. By default, Express does not parse the request body for you. The body-parser middleware is responsible for parsing the body and making it available under req.body.

1.) Parsing JSON Data: Use express.json() to parse JSON formatted request bodies.<br>
2.) Parsing URL-encoded Data: Use express.urlencoded({ extended: true }) to parse URL-encoded request bodies.

- *Step-10 ->* 

        //Setting up a GET API for a particular blog
        app.get('/blogs/:id', (req, res) => {
            console.log(req.params); //Will give access to the id in the form of key-value pair
            const result = blogsList.filter((blog) => blog.id == req.params.id);
            return res.status(200).json({
                data: result,
                success: true
            });
        });

---
<br><br>
---

# *Middlewares*
- Middlewares are the functions that has access to the request  object, response object and the next middleware function.

- Middleware are basically used for doing the extra purpose work before reaching the controllers like authentication and authirisation.

- If we just don't call the next() function in that case the next middleware won't be called and it will gey halted at that position.

- Now let's say we want to use any one middleware with each of the route then one of the way to do is by writting that middleware with each route manually and the other way is by calling that middleware with the `use` function of app.

        app.use(<middleware-name>); ->eventually it will be called by each of the route.