# hackerbay microservice

### ##Hackerbay microservice Api collection

### this collection contains following request

- login a user with any name and password

- create image thumbnail for public image url

- perfom json patching on a json object

- it also returns the logs of all request made to the endpoints

## POST login

```
http://localhost:3000/v1/login
```
- Api endpoint to Login user in the system

- A successfull login will result in an http 200 status code

```
BODY raw
```
```
{
"username": "kola",
"password" : "password"
}
```
```
Example Request
login example
```
```
--data-raw '{
"username": "kola",
"password" : "password"
}'
```
```
Example Response
200 － OK
```
```
{
"status": "success",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtvbGEiLCJwYXNzd29yZCI6InBhc3N3b3JkIiw
}
```
## POST image_thumbnail

```
http://localhost:3000/v1/image_thumbnail
```
- Api endpoint to image_thumbnail will return the thumbnail of an image

- A successfull request will result in an http 200 status code if image url is invalid it will return http 400

- status code no token on request will return http 401 status code

- HEADERS

```
BODY raw
```
```
Content-Type
application/json
```

```
{
"imageUrl": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
}
```
```
Example Request
```

```
image thumbnail example
```
```
curl --location --request POST 'http://localhost:3000/v1/image_thumbnail' \
--header 'Content-Type: application/json' \
```
```
data-raw '{
"imageUrl": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
}'
```
```
Example Response
200 － OK
```
```
{
"status": "success",
"thumbnail": {
"type": "Buffer",
"data": [
255,
216,
255,
219,
0,
```
## PATCH json-patch

```
http://localhost:3000/v1/json-patch
```
- Api endpoint to json-patch will return a patched json object

- A successfull request will result in an http 200 status code if json object and patch object is missing it

- will return http 400 status code no token on request will return http 401 status code



```
BODY raw
```
```
Content-Type
application/json
```

```
json patch example request
```

```
json-patch example
curl --location --request PATCH 'http://localhost:3000/v1/json-patch' \
--header 'Content-Type: application/json' \
```

```
--data-raw{
{
"jsonObject": {
"firstName": "albert",
"PhoneNumbers": []
},
"jsonPatchObject": [
{
"op": "replace",
"path": "/PhoneNumbers",
"value": 2347063824176
}]
}
```


```
Example Response
200 － OK
{
"status": "success",
"jsonObject": {
"firstName": "albert",
"PhoneNumbers": 2347063824176
}
}
```
## GET Logs

```
http://localhost:3000/v1/logs
```
- Api endpoint to logs will return the logs of all request made to endpoints

- A successfull request will result in an http 200 status code no token on request will return http 401

- status code

- HEADERS

```
BODY raw
```
```
Content-Type
application/json
```



```
Example Request
request logs example
```
```
curl --location --request GET 'http://localhost:3000/v1/logs' \
--header 'Content-Type: application/json' \

```
```
Example Response
200 － OK
```
```
POST /v1/image_thumbnail 403 130ms
POST /v1/image_thumbnail 403 25ms
POST /v1/image_thumbnail 404 1ms
POST /v1/image_thumbnail 403 1ms
POST /v1/image_thumbnail 200 -164ms
PATCH /v1/json-patch 400 1ms
PATCH /v1/json-patch 400 1ms
PATCH /v1/json-patch 200 1ms
GET /v1/logs 200 6ms
POST /v1/image_thumbnail 404 1ms
```


```
End
```

