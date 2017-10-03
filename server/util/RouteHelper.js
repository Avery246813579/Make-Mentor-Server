var prototype = module.exports;
var Errors = require('./Errors');

/**
 * Checks if the given data is valid depending on the information requirements
 *
 * @param req               The http request
 * @param res               The http response
 * @param information       The information and requirements
 * @returns {boolean}       If the information is invalid
 */
prototype.hasInvalidData = function (req, res, information) {
    for (var key in information) {
        if (information.hasOwnProperty(key)) {

            // Checks if the argument is in the body
            if (typeof req.body[key] === "undefined") {
                this.sendError(res, Errors.BODY_ARGUMENT_MISSING, {KEY: key});

                return true;
            }

            var data = req.body[key], dataString = data.toString();

            // Checks length is long enough
            if (typeof information[key]['MAX'] !== "undefined" && dataString.length > information[key]['MAX']) {
                this.sendError(res, Errors.BODY_ARGUMENT_TOO_LONG, {
                    KEY: key,
                    REQUESTED: information[key]['MAX'],
                    GIVEN: dataString.length
                });

                return true;
            }

            // Checks length is too small
            if (typeof information[key]['MIN'] !== "undefined" && dataString.length < information[key]['MIN']) {
                this.sendError(res, Errors.BODY_ARGUMENT_TOO_SHORT, {
                    KEY: key,
                    REQUESTED: information[key]['MIN'],
                    GIVEN: dataString.length
                });

                return true;
            }

            // Checks length is equal to the amount
            if (typeof information[key]['LENGTH'] !== "undefined" && dataString.length !== information[key]['LENGTH']) {
                this.sendError(res, Errors.BODY_ARGUMENT_INVALID_LENGTH, {
                    KEY: key,
                    REQUESTED: information[key]['LENGTH'],
                    GIVEN: dataString.length
                });

                return true;
            }

            // Checks the type is equal to the type wanted
            if (typeof information[key]['TYPE'] !== "undefined") {
                switch (information[key]['TYPE'].toUpperCase()) {
                    default:
                        break;
                    case "NUMBER":
                        if (isNaN(data)) {
                            this.sendError(res, Errors.BODY_ARGUMENT_INVALID_TYPE, {
                                KEY: key,
                                REQUESTED: information[key]['TYPE']
                            });

                            return true
                        }

                        break;
                    case "LNU":
                        if (!/^\w+$/.test(data)) {
                            this.sendError(res, Errors.BODY_ARGUMENT_INVALID_TYPE, {
                                KEY: key,
                                REQUESTED: information[key]['TYPE']
                            });

                            return true;
                        }

                        break;

                }
            }
        }
    }

    return false;
};

prototype.sanitizeData = function (string) {
    return string.replace(/[^\x20-\x7E]+/g, '');
};

prototype.sendSuccess = function (res, data) {
    res.status(200).json({
        success: true,
        data: data
    });
};

prototype.sendError = function (res, error_code, data) {
    res.status(200).json({
        success: false,
        code: error_code['CODE'],
        message: error_code['DESCRIPTION'],
        data: data
    });
};

prototype.formatTime = function (date) {
    var instance = this;

    return instance.toDouble(date.getHours()) + ":" + instance.toDouble(date.getMinutes()) + ":" + instance.toDouble(date.getSeconds())
        + " " + instance.toDouble(date.getMonth() + 1) + "-" + instance.toDouble(date.getDate()) + "-" + instance.toDouble(date.getFullYear())
};

prototype.getTime = function () {
    return this.formatTime(this.getServerTime());
};

prototype.parseTime = function (raw) {
    var time = new Date();

    var split = raw.split(" ");
    var fSplit = split[0].split(":");
    var sSplit = split[1].split("-");

    time.setHours(fSplit[0]);
    time.setMinutes(fSplit[1]);
    time.setSeconds(fSplit[2]);

    time.setMonth(sSplit[0] - 1);
    time.setDate(sSplit[1]);
    time.setFullYear(sSplit[2]);

    return time;
};

prototype.toDouble = function (number) {
    if (number > 9) {
        return number;
    } else {
        return "0" + number;
    }
};
