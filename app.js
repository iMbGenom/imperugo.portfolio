var express = require('express');
var app = express();

//enable compression
var compression = require('compression');
app.use(compression({
  threshold: 512
}));

//enabling public folder
var path = require('path');
var publicFolder = path.dirname(module.filename);
var oneYear = 31557600000;
app.use(express.static(publicFolder, { maxAge: oneYear }));

var port = Number(process.env.PORT || 5000);

app.listen(port, function() {
    console.info("Listening on " + port);
});
