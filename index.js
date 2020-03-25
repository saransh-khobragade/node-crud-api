const request = require('request');
const express = require('express')
const app = express()
const server = require('http').createServer(app);

app.get('/test_get', async (req, res) => {
    const postId = req.query.id
    
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

app.post('/test_post', async (req, res) => {
    
    const req_body={}
    
    request({
        url: 'https://jsonplaceholder.typicode.com/posts',
        headers: {
            'Content-Type': "application/json; charset=UTF-8"
        },
        method: 'GET',
        json:true,
        body:req_body
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

