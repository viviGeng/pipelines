var request = require("request")
var express = require("express")
var app = express()
var http = require("http")
var fs = require("fs")

var bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var options = {
  method: "GET",
  url: "https://atlas-uat.imdo.co/go/pipelines.json",
  headers: {
    //'Postman-Token': 'c3c72afa-571f-4b68-a4fe-2f509d19834f',
    //'cache-control': 'no-cache',
    Authorization: "Basic dHdlcjpUaG91Z2h0V29ya3M=",
    "Content-Type": "application/x-www-form-urlencoded"
  },
  form: false
}

var result = {}

function test() {
  request(options, function(error, response, body) {
    if (error) throw new Error(error)
    var timestamp = Date.parse(new Date())
    console.log(timestamp)
    result = body
  })
}
test()
setInterval(() => {
  test()
}, 2000)

app.get("/pipelines", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.send(result)
})
app.get("/go/pipelines", function(req, res) {
  setTimeout(() => {
    var data = fs.readFileSync("./index.html", "utf8")
    res.send(data)
  }, 1000)
})
http.createServer(app).listen(3000)
