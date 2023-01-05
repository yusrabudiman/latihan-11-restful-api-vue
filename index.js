const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());

const conn = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'crud_db'
})

conn.connect((err) => {
    if (err) throw err;
    console.log('MySql Connected');
})

//products
app.get('/api/products', (req, res, next) => {
    let sql = 'SELECT * FROM product'
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.json({
            'response' : results
        })
    })
})

app.get('/api/products/:id', (req, res, next) => {
    let sql = 'SELECT * FROM product WHERE product_id=' + req.params.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.json({
            "response" : results
        })
    })
})

app.post('/api/products', (req, res, next) => {
    let data = {
        product_name : req.body.product_name,
        product_price : req.body.product_price
    }
    let sql = 'INSERT INTO product SET ?'
    let query = conn.query(sql, data, (err, results) => {
        if (err) throw err;
        console.log(data);
        res.json({
            'response' : 'INSERT'
        })
    })
})
app.put('/api/products/:id', (req, res, next) => {
    let sql = "UPDATE product SET product_name='" + 
    req.body.product_name + "', product_price='" + 
    req.body.product_price + "' WHERE product_id=" + 
    req.params.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.json({
            "response" : "UPDATED"
        })
    })
})
app.delete('/api/products/:id', (req, res, next) => {
    let sql = "DELETE FROM product WHERE product_id=" +req.params.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.json({
            "response" : "DELETED"
        })
    })
})

//users
app.get('/api/users', (req, res, next) => {
    let sql = 'SELECT * FROM user'
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
})
app.get('/api/users/:id', (req, res, next) => {
    let sql = 'SELECT * FROM user WHERE user_id=' + req.params.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
})
app.post('/api/users', (req, res, next) => {
    let data = {
        user_name : req.body.user_name,
        user_email : req.body.user_email,
        user_address : req.body.user_address,
        user_phone : req.body.user_phone
    }
    let sql = 'INSERT INTO user SET ?'
    let query = conn.query(sql, data, (err, results) => {
        console.log(data)
        if (err)
            res.json({status:500, error:err, response:null})
        res.json({status:200, error:null, response:results});
    })
})
app.put('/api/users/:id', (req, res, next) => {
    let sql = "UPDATE user SET user_name='" + 
    req.body.user_name + "', user_email='" + 
    req.body.user_email + "', user_address='" + 
    req.body.user_address +"', user_phone='" + 
    req.body.user_phone + "' WHERE user_id=" + 
    req.params.id;

    let query = conn.query(sql, (err, results) => {
        if (err)
            res.json({status:500, error:err, response:null})
        res.json({status:200, error:null, response:results});
    })
})

app.delete('/api/users/:id', (req, res, next) => {
    let sql = "DELETE FROM user WHERE user_id=" +req.params.id;
    let query = conn.query(sql, (err, results) => {
        console.log(sql)
        if (err)
            res.json({status:500, error:err, response:null})
        res.json({status:200, error:null, response:results});
    })
})
app.listen(3000, () => {
    console.log("server json running at 3000");
})