var JSSQL = require('jssql');
var Scheme = JSSQL.Scheme;
var Table = JSSQL.Table;

module.exports = new Table('Tokens', new Scheme({
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
    ACCESS_TOKEN: {
        TYPE: "TEXT",
        NULL: false
    }
}));