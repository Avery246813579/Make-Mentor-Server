var JSSQL = require('jssql');
var Scheme = JSSQL.Scheme;
var Table = JSSQL.Table;

module.exports = new Table('Test', new Scheme({
    ID: {
        TYPE: "INT",
        AI: true,
        INDEX: "PRIMARY KEY",
        NULL: false
    },
    OWNER: {
        TYPE: "BOOLEAN",
        NULL: false
    }
}));