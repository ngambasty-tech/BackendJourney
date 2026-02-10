const fs = require('fs') //file system
const path = require('path') //help construct path for all OS
const express = require('express');
const { title } = require('process');

const app = express();
app.use(express.urlencoded({extended:false}));
 

app.get('/currenttime', function(req,res) {
    res.send('<h1>'+ new Date().toISOString() +'</h1>');
})
app.get('/', function(req,res) {
    res.send('<form action="/store-user" method="POST"><label>Enter Name</label><input type="text" name="username"><button>Submit</button></form>')
})
app.post('/store-user', function(req, res) {
    const userName= req.body.username;
    // console.log(userName);
    const filePath = path.join(__dirname,'data','users.json') //constructing the filepath
    const fileData = fs.readFileSync(filePath); //reading the data from the filepath
    const existingUsers = JSON.parse(fileData); //converting the text to a format understandable by js
    existingUsers.push(userName); //adding the username before writing back into the file
    fs.writeFileSync(filePath, JSON.stringify(existingUsers));
    res.send('<h1>Username stored</h1>');
})
app.get('/users', function(req,res) {
    const filePath = path.join(__dirname,'data','users.json')
    const fileData = fs.readFileSync(filePath);
    const existingUsers = JSON.parse(fileData);

    //dynamic html response
    let responseData = '<ul>'

    for (const x of existingUsers){
        responseData += '<li>' + x + '</li>';
    }
    responseData += '</ul>';

    res.send(responseData);
})

app.listen(3000)

// function handleRequest(request, response){
// if(request.url === '/currenttime'){
//     response.statusCode=200;
//     response.end('<h1>'+ new Date().toISOString() +'</h1>')
// }
// else if (request.url==='/'){
//     response.statusCode= 200;
//     response.end('<h1>Hello mf</h1>'); 

// }
// }

// const server=http.createServer(handleRequest )
// server.listen(3000) 