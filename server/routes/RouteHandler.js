var RouteHelper = require('./../util/RouteHelper');
var Errors = require('./../util/Errors');

function RouteHandler(app){
    app.use(function (err, req, res, next) {
        if (err.status === 400) {
            return RouteHelper.sendError(res, Errors.BODY_JSON_INVALID);
        }

        return next(err);
    });

}

module.exports = RouteHandler;