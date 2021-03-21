const sqlite = require("sqlite3").verbose();

module.exports = {
  name: "status",
  description: "XP and LVL System status command.",
  execute(message, args) {
    let db = new sqlite.Database("./db.db", sqlite.OPEN_READWRITE);

    db.get(`SELECT xp FROM data WHERE username = '${message.author.tag}'`, [xp], (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        var exp = row.xp += 1;
    })
    db.
  },
};
