# How to run server
```
node index.js
```

# Curls
GET All USERS
```
curl --location 'http://localhost:8080/users'
```

Get User By Id
```
curl --location 'http://localhost:8080/user?id=1'
```

Save user
```
curl --location 'http://localhost:8080/user' \
--header 'Content-Type: application/json' \
--data '{
    "name":"person4"
}'
```

Update User by Id
```
curl --location --request PUT 'http://localhost:8080/user?id=1' \
--header 'Content-Type: application/json' \
--data '{
    "name":"newperson"
}'
```

Delete User by Id
```
curl --location --request DELETE 'http://localhost:8080/user?id=1'
```