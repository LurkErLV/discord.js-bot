const sqlite = require("sqlite3").verbose();

module.exports = {
  name: "status",
  description: "XP and LVL System status command.",
  execute(message, args) {
    let db = new sqlite.Database("./database.db", sqlite.OPEN_READWRITE);

    db.all(`SELECT * FROM users WHERE userid = ${message.author.id}`, [], (err, rows) => {
      if (err) {
        console.log(err);
      }
      message.channel.send(`Your XP = '${rows[0].xp}', your LVL = '${rows[0].lvl}'`);
    });

    db.close();
    //    db.run(`UPDATE users SET xp = 10 WHERE username = 'LurkEr#0212'`),function(err){
    //      if (err) {
    //        console.log(err);
    //      }
    //    }
    //    db.close();
  },
};
