var prototype = module.exports;

var errors = {};

prototype.findError = function (code) {
    if (typeof errors[code] === "undefined") {
        return {
            CODE: -1,
            DESCRIPTION: "Error description not found"
        }
    }

    return errors[code];
};

errors['BODY_JSON_INVALID'] = prototype.BODY_JSON_INVALID = {
    CODE: -1,
    DESCRIPTION: "JSON in body is invalid"
};

errors['BODY_ARGUMENT_MISSING'] = prototype.BODY_ARGUMENT_MISSING = {
    CODE: 0,
    DESCRIPTION: "Argument in body is missing"
};

errors['BODY_ARGUMENT_TOO_LONG'] = prototype.BODY_ARGUMENT_TOO_LONG = {
    CODE: 1,
    DESCRIPTION: "Argument in body is too long"
};

errors['BODY_ARGUMENT_TOO_SHORT'] = prototype.BODY_ARGUMENT_TOO_SHORT = {
    CODE: 2,
    DESCRIPTION: "Argument in body is too short"
};

errors['BODY_ARGUMENT_INVALID_LENGTH'] = prototype.BODY_ARGUMENT_INVALID_LENGTH = {
    CODE: 3,
    DESCRIPTION: "Argument in body does not match required length"
};

errors['BODY_ARGUMENT_INVALID_TYPE'] = prototype.BODY_ARGUMENT_INVALID_TYPE = {
    CODE: 4,
    DESCRIPTION: "Argument in body does not match required type"
};