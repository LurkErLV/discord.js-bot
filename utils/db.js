const sqlite = require("sqlite3").verbose();
module.exports = new sqlite.Database("./database.db", sqlite.OPEN_READWRITE);