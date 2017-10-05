function TableHandler() {
    var JSSQL = require('jssql');
    var Database = JSSQL.Database;

    var _Database, _Database2;

    _Database = new Database({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });

    console.log('Make Mentor >> Database is running');
    _Database.table([
        /* Account Routes */
        require('./test/Test')
    ]);
}

module.exports = TableHandler;