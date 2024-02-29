const express = require("express");
const sqlite3 =  require("sqlite3");

const app = express();

//Connet to the database
const db = new sqlite3.Database('blog.db')

//Define a route to get all posts
 app.get('/posts', (req,res) =>{
    db.all('SELECT * FROM posts', (err,rows) => {
        if (err) {
            res.status(500).json({error:err.message});
            return;
        }
        res.json(rows)
    });
 });

 // Define a route to get a single commetn
 app.get('/post/:id',(req,res)=>{
    const id = req.params.id;
    
    db.get(`SELECT * FROM posts WHERE id = ?` ,[id],(err,rows) =>{
         if (err) {
            res.status(500).json({error: err.message});
            return;
         }
         if (!rows){
            res.status(404).json({error:'Comment not found'});
            return;
         }
         res.json(rows)
    });
 });

 // Define a route to create a new Comment

 app.post('/posts',(req,res)=>{
    const title = req.body.title;
    const content = req.body.content;

    db.run(`INSERT INTO posts (title,content) VALUES (?, ?)`, [title,content] , (err)=>{
        if (err) {
           res.status(500).json({error:err.message});
           return;
        }
        res.json({message:'Comment created successfully'})
    });
 });

// Define a route to update a comment
app.put('/posts/:id',(req,res)=>{
    const id = req.params.id;
    const title = req.body.title;
    const content = req.body.content;

    db.run(`UPDATE posts SET title = ? , content = ? WHERE id = ?`,[title,content,id], (err) =>{
        if (err) {
            res.status(500).json({ error: err.message});
            return;
        }
        res.json({message:'Comment updated successfully'});
    });
});

// Delete the  a comment 

app.delete('/posts/:id',(req,res)=>{
    const id = req.params.id;

    db.run(`DELETE FROM posts WHERE id = ?`,[id],(err) =>{
        if (err) {
            res.status(500).json({error:err.message});
            return;
        }
        res.json({message:'Comment deleted Successfully'});
    });
});

// server to start

app.listen(3000,()=>{
    console.log('Server started port 3000');
});