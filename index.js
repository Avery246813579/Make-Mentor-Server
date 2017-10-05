/**
 * Lets not crash the program. just throw the stack
 */
process.on('uncaughtException', function (err) {
    if (err.name === "AssertionError") {
        return;
    }

    if (err.name !== "AssertionError") {
        console.log("-=- Node Critical Error Start -=-");
        console.dir(err.stack);
        console.log("-=- Node Critical Error End -=-");
    }
});

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var express = require('express');
var app = express();
var fs = require('fs');

app.use(bodyParser.json());
app.use(cookieParser());
require('dotenv').config();
var request = require('request');

var pack = JSON.parse(fs.readFileSync('package.json', 'utf8'));

/**
 * Loading all of our things
 */
require('./server/tables/TableHandler')();

var RouteHelper = require('./server/util/RouteHelper');
var Errors = require('./server/util/Errors');

app.use(function (err, req, res, next) {
    if (err.status === 400) {
        return RouteHelper.sendError(res, Errors.BODY_JSON_INVALID);
    }

    return next(err);
});


app.post('/account', function (req, res) {
    if (RouteHelper.hasInvalidData(req, res, {
            DOG: {
                LENGTH: 5,
                TYPE: "LNU"
            }
        })) {

        return;
    }

    res.status(200).json({
        success: true,
        code: 100
    })
});

app.get('/login', function (req, res) {
    res.writeHead(302, {
        'Location': 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78jv3w4zvog91u&redirect_uri=http%3A%2F%2Flocalhost%3A6969%2Fcallback&state=987654321&scope=r_basicprofile+r_emailaddress '
    });
    res.end();
});

var Accounts = require('./server/tables/account/Accounts');
var Tokens = require('./server/tables/account/Tokens');

/*
Update our Linkedin information and make sure we have our Token assigned to our Account
 */
app.post('/validate', function (req, res) {
    request.get({
        url: 'https://api.linkedin.com/v1/people/~:(id,first_name,last_name,picture-url,industry,email-address,headline)?oauth2_access_token=' + req.cookies.access_token + '&format=json',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }, function (error, response, body) {
        body = JSON.parse(body);

        if (typeof body['errorCode'] !== "undefined") {
            RouteHelper.sendError(res, Errors.API_ERROR);
            return;
        }

        Accounts.find({LINKED_ID: body['id']}, function (aErr, aRows) {
            if (aErr) {
                RouteHelper.sendError(res, Errors.INTERNAL_ERROR);
                return;
            }

            var statement = {
                FIRST_NAME: body['firstName'],
                LAST_NAME: body['lastName'],
                EMAIL: body['emailAddress'],
                LOGO: body['pictureUrl'],
                INDUSTRY: body['industry'],
                HEADLINE: body['headline']
            };

            if (aRows.length > 0) {
                Accounts.update(statement, {LINKED_ID: body['id']}, function (auErr) {
                });
            } else {
                statement['LINKED_ID'] = body['id'];
                Accounts.insert(statement, function (aiErr /** Robots will rule the world **/) {
                });
            }

            Tokens.find({LINKED_ID: body['id'], ACCESS_TOKEN: req.cookies.access_token}, function (tErr, tRows) {
                if (tErr) {
                    RouteHelper.sendError(res, Errors.INTERNAL_ERROR);
                    return;
                }

                if (tRows.length < 1) {
                    Tokens.insert({LINKED_ID: body['id'], ACCESS_TOKEN: req.cookies.access_token}, function(tiErr){});
                }

                RouteHelper.sendSuccess(res);
            });
        });
    });
});

app.get('/callback', function (req, res) {
    request.post({
        url: 'https://www.linkedin.com/uas/oauth2/accessToken?grant_type=authorization_code&code=' + req.query.code + '&redirect_uri=http%3A%2F%2Flocalhost%3A6969%2Fcallback&client_id=78jv3w4zvog91u&client_secret=' + process.env.LINKEDIN_SECRET,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }, function (error, response, body) {
        body = JSON.parse(body);

        if (typeof body['access_token'] !== "undefined") {
            res.writeHead(200, {
                'Set-Cookie': 'access_token=' + body['access_token'],
                'Content-Type': 'text/plain'
            });

            res.write(JSON.stringify({
                success: true,
                code: 100
            }));

            res.end();

            return;
        }

        res.status(200).json({
            success: false,
            code: 100
        })
    });
});

app.get('/callback2', function (req, res) {
    res.status(200).json({
        success: true,
        code: 100
    })
});


// app.listen(8081, function () {
//     console.log(pack.name + " v" + pack.version + " has booted up.");
// });

app.listen(8081, function () {
    console.log(pack.name + " v" + pack.version + " has booted up.");
});
