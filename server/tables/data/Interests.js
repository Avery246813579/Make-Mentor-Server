var JSSQL = require('jssql');
var Scheme = JSSQL.Scheme;
var Table = JSSQL.Table;

module.exports = new Table('Interests', new Scheme({
    ID: {
        TYPE: "INT",
        AI: true,
        INDEX: "PRIMARY KEY",
        NULL: false
    },
    LINKED_ID: {
        TYPE: "VARCHAR",
        LENGTH: 50,
        NULL: false
    },
    // 0: Mentor, 1: Mentee
    MENT: {
        TYPE: "TINYINT",
        LENGTH: 1,
        NULL: false
    },
    // 0: Full Stack Developer, 1: Mobile Developer, 2: Other
    FOCUS: {
        TYPE: "INT",
        LENGTH: 2,
        NULL: false
    }
}));