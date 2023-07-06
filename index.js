const http = require('http')
const url = require('url') 

const port = process.env.PORT || 8080

const users = [
    "person1",
    "person2",
    "person3"
]

const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url)

    if (req.method === 'GET' && pathname === '/users') {
        return GetAll(req, res)
    }else if (req.method === 'GET' && pathname === '/user') {
        return Get(req, res)
    } else if (req.method === 'POST'&& pathname === '/user') {
        return Post(req, res)
    } else if (req.method === 'DELETE' && pathname === '/user') {
        return Delete(req, res)
    } else if (req.method === 'PUT' && pathname === '/user') {
        return Put(req, res)
    }else{
        return handleError(res, 404)
    }
})

function GetAll(_req, res) {
    
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    return res.end(`{"users": ${JSON.stringify(users)}}`)
}

function Get(req, res) {
    
    const { query } = url.parse(req.url)
    const params = new URLSearchParams(query);
    const id = params.get('id');
    if (id === null) {
        return handleError(res, 400)
    }
    
    const user = users[parseInt(id)]
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    return res.end(`{"user": ${JSON.stringify(user)}}`)
}


function Post(req, res) {

    const size = parseInt(req.headers['content-length'], 10)
    const buffer = Buffer.allocUnsafe(size)
    var pos = 0

    req 
    .on('data', (chunk) => { 
      const offset = pos + chunk.length 
      if (offset > size) { 
        reject(413, 'Too Large', res) 
        return 
      } 
      chunk.copy(buffer, pos) 
      pos = offset 
    }) 
    .on('end', () => { 
      if (pos !== size) { 
        reject(400, 'Bad Request', res) 
        return 
      } 
      const data = JSON.parse(buffer.toString())
      
      users.push(data.name)
      console.log('User Posted: ', data) 
      res.setHeader('Content-Type', 'application/json;charset=utf-8');
      res.end(`{"users": ${JSON.stringify(users)}}`)
    })
}

function Put(req, res) {
      
    const { query } = url.parse(req.url)
    const params = new URLSearchParams(query);
    const id = params.get('id');
    if (id === null) {
        return handleError(res, 400)
    }

    const size = parseInt(req.headers['content-length'], 10)
    const buffer = Buffer.allocUnsafe(size)
    var pos = 0
    req 
    .on('data', (chunk) => { 
      const offset = pos + chunk.length 
      if (offset > size) { 
        reject(413, 'Too Large', res) 
        return 
      } 
      chunk.copy(buffer, pos) 
      pos = offset 
    }) 
    .on('end', () => { 
      if (pos !== size) { 
        reject(400, 'Bad Request', res) 
        return 
      } 
      if (buffer.toString() === ""){
        return handleError(res, 400)
      }
      const data = JSON.parse(buffer.toString())
      
      users[parseInt(id)] = data.name
      
      res.setHeader('Content-Type', 'application/json;charset=utf-8');
      res.end(`{"users": ${JSON.stringify(users)}}`)
    })
}

function Delete(req, res) {

    const { query } = url.parse(req.url)
    const params = new URLSearchParams(query);
    const id = params.get('id');
    if (id === null) {
        return handleError(res, 400)
    }

    const userDeleted = users[parseInt(id)]
    users.splice(parseInt(id),1);

    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.end(`{"userDeleted": ${JSON.stringify(userDeleted)}}`)
}

function handleError (res, code) { 
    res.statusCode = code 
    res.end(`{"error": "${http.STATUS_CODES[code]}"}`) 
} 

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});