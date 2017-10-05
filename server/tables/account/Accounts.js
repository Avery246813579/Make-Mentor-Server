var JSSQL = require('jssql');
var Scheme = JSSQL.Scheme;
var Table = JSSQL.Table;

module.exports = new Table('Accounts', new Scheme({
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
    FIRST_NAME: {
        TYPE: "VARCHAR",
        LENGTH: "50",
        NULL: false
    },
    LAST_NAME: {
        TYPE: "VARCHAR",
        LENGTH: "50",
        NULL: false
    },
    EMAIL: {
        TYPE: "VARCHAR",
        LENGTH: "150",
        NULL: false
    },
    LOGO: {
        TYPE: "TEXT",
        NULL: false
    },
    HEADLINE: {
        TYPE: "TEXT",
        NULL: false
    },
    INDUSTRY: {
        TYPE: "VARCHAR",
        LENGTH: 100,
        NULL: false
    }
}));