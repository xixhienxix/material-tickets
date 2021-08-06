// Require packages and set the port
const express = require('express');
const port = 8081;
const bodyParser = require('body-parser');
const routes = require('./routes/routes')
const app = express();
const cors = require('cors');

// Use Node.js body parsing middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

routes(app);

// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${server.address().port}`);
});
// const port = process.env.PORT || 8081

// const mysql = require('mysql')

// //MYSQL

// const pool = mysql.createPool({
//     connectionLimit:10,
//     host:'localhost',
//     user:'root',
//     password:'',
//     database:'tickets_univer',

// })


//POST
// app.post('/api/tickets',(req,res)=>{

//     pool.getConnection((err,connection)=>{
//         if(err) throw err
//         console.log('connectec as id: ', connection.threadId)

//             connection.query('INSERT INTO tickets SET ?',request.body, (error, result) => {
//                 if (error) throw error;
         
//                 response.status(201).send(`User added with ID: ${result.insertId}`);
//             });
//     })
// })
//GET
// app.get('/api/get/campanas',(req,res)=>{

//     pool.getConnection((err,connection)=>{
//         if(err) throw err
//         console.log('connectec as id: ', connection.threadId)

//             connection.query('SELECT * FROM campanas',(err,rows)=>{
//                 connection.release()//returns the connection pool

//                 if(!err){
//                     res.send(rows)
//                 }else{
//                     console.log(err)
//                 }
//             })

//     })
// })
// app.get('/api/get/tickets',(req,res)=>{

//     pool.getConnection((err,connection)=>{
//         if(err) throw err
//         console.log('connectec as id: ', connection.threadId)

//             connection.query('SELECT * FROM tickets',(err,rows)=>{
//                 connection.release()//returns the connection pool

//                 if(!err){
//                     res.send(rows)
//                 }else{
//                     console.log(err)
//                 }
//             })

//     })
// })


// app.listen(port,()=>console.log('Listen on port: ${port}'))
