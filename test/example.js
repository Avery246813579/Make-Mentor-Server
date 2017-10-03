var expect = require("chai").expect, chai = require("chai"), request = require("request");
require('../index.js');

var HEADERS = {
    'Content-Type': 'application/json',
    'Cookie': config['Cookie']
};

describe("Event Route API", function () {
    describe("Creating an Event", function () {
        it("should create an event", function (done) {
            request.post({
                url: 'http://localhost:8081/csu/api/organization/' + config['Org'] + '/event',
                method: 'POST',
                json: {
                    NAME: 'EVENT NAME',
                    DESCRIPTION: "EVENT DESCRIPTION",
                    START_TIME: "22:18:41 01-16-2017",
                    END_TIME: "22:18:41 01-16-2017",
                    TYPE: "0"
                },
                headers: HEADERS
            }, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body.success).to.equal(true);
                EVENT = body['data'];

                config['PAST_EVENT'] = EVENT;
                fs.writeFile('test/cache.json', JSON.stringify(config), 'utf8');

                done();
            });
        });
    });
});