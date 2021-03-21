const sqlite = require("sqlite3").verbose();

module.exports = {
  name: "status",
  description: "XP and LVL System status command.",
  execute(message, args) {
    let db = require("../utils/db.js");

    db.all(`SELECT * FROM users WHERE userid = ?`, [message.author.id], (err, rows) => {
      if (err) {
        console.log(err);
      }
      message.channel.send(`Your XP = '${rows[0].xp}', your LVL = '${rows[0].lvl}'`);
    });
  },
};
