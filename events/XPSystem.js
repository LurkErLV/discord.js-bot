const fs = require('fs');
const prefix = '!';

module.exports = {
    name: 'message',
    once: false,
    execute(message) {
        if (message.author.bot) return;
        let db = require('../utils/db.js');
        if (message.content.startsWith(prefix)) return;
        if (message.author.bot) return;
        db.get(`SELECT * FROM users WHERE userid = ?`, [message.author.id], (err, row) => {
            if (err) {
                console.log(err);
                return;
            }
            if (row === undefined) {
                let insertdata = db.prepare(`INSERT INTO users VALUES(?,?,?,?,?,?)`);
                insertdata.run(message.author.id, message.author.tag, "0", "1", "500", "false");
                insertdata.finalize();
                return;
            }
                db.run(`UPDATE users SET xp = xp + 1.5 WHERE userid = ?`, [message.author.id]), function (err) {
                    if (err) {
                        console.log(err);
                }
            }
        });
    },
};