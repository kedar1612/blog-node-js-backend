const fetch = require('node-fetch');

//get all posts
 
fetch('http://localhost:3000/posts').then(response => response.json()).then(data=>console.log(data))