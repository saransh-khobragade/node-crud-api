const request = require('request');
const express = require('express')
const app = express()
const server = require('http').createServer(app);

const bodyParser = require('body-parser')
app.use(bodyParser());

//basic get api with query string and query params
app.get('/healthcheck', async (req, res) => {
    return res.status(200).json({"status":"Running"})
});

//basic get api with query string and query params
app.get('/test_get/:id', async (req, res) => {
    const postId = req.query.postId
    const id = req.params.id
    
    request({
        url: 'https://jsonplaceholder.typicode.com/comments',
        headers: {
            'Content-Type': "application/json; charset=UTF-8"
        },
        method: 'GET',
        json:true,
        qs:{postId}
    }, function (err, httpResponse, data) {
        if (err) {
            return res.status(400).json({err})
        } else {
            return res.status(200).json({data})
        }
    });
});


//basic post api with body
app.post('/test_post', async (req, res) => {
    request({
        url: 'https://jsonplaceholder.typicode.com/posts',
        headers: {
            'Content-Type': "application/json; charset=UTF-8"
        },
        method: 'GET',
        json:true,
        body:req.body
    }, function (err, httpResponse, data) {
        if (err) {
            return res.status(400).json({err})
        } else {
            return res.status(200).json({data})
        }
    });
});

server.listen(process.env.PORT || 8080,()=>{
    console.log('server running...at 8080');
});

