const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));
var intryId = 0;
app.get("/", function(req, res) {
  intryId++;
  console.log(intryId);
  request("http://api.thingspeak.com/channels/920193/feed.json?api_key=BJQWU3KUQAT7C8Q9", function(err, response, body) {
    var data = JSON.parse(body);
    console.log(data);
    var temp = data.feeds[intryId].field1;
    var hum = data.feeds[intryId].field2;
    var colevel = data.feeds[intryId].field3;
    res.render("main", {temperature: temp, humidity: hum, carbon: colevel});
});

});


app.post("/", function(req, res){
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("server started at port 3000");
});

    

