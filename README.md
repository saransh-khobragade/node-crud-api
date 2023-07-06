# How to run server
```
node index.js
```

# Curls
```
curl --location 'http://localhost:8080/users'

curl --location 'http://localhost:8080/user?id=1'

curl --location 'http://localhost:8080/user' \
--header 'Content-Type: application/json' \
--data '{
    "name":"person4"
}'

curl --location --request PUT 'http://localhost:8080/user?id=1' \
--header 'Content-Type: application/json' \
--data '{
    "name":"newperson"
}'

curl --location --request DELETE 'http://localhost:8080/user?id=1'
```