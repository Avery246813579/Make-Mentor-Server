/**
 * Lets not crash the program. just throw the stack
 */
process.on('uncaughtException', function (err) {
    if(err.name === "AssertionError"){
        return;
    }

    if (err.name !== "AssertionError") {
        console.log("-=- Node Critical Error Start -=-");
        console.dir(err.stack);
        console.log("-=- Node Critical Error End -=-");
    }
});

var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var fs = require('fs');
app.use(bodyParser.json());

var pack = JSON.parse(fs.readFileSync('package.json', 'utf8'));

var RouteHelper = require('./server/util/RouteHelper');
var Errors = require('./server/util/Errors');

app.use(function (err, req, res, next) {
    if (err.status === 400) {
        return RouteHelper.sendError(res, Errors.BODY_JSON_INVALID);
    }

    return next(err);
});


app.post('/test', function(req, res){
    if (RouteHelper.hasInvalidData(req, res, {
            DOG: {
                LENGTH: 5,
                TYPE: "LNU"
            }
        })){

        return;
    }

    res.status(200).json({
        success: true,
        code: 100
    })
});

// app.listen(8081, function () {
//     console.log(pack.name + " v" + pack.version + " has booted up.");
// });

app.listen(6969, function () {
    console.log(pack.name + " v" + pack.version + " has booted up.");
});
