const fs = require('fs');

module.exports = {
    name: 'onMemberJoins',
    once: false,
    execute() {
        let db = require('../utils/db.js');
        db.get(`SELECT * FROM users WHERE userid = ?`, [member.user.id], (err, row) => {
            if (err) {
                console.log(err);
                return;
            }
            if (row === undefined) {
                let insertdata = db.prepare(`INSERT INTO users VALUES(?,?,?,?,?,?)`);
                insertdata.run(member.user.id, member.user.tag, "0", "1", "500", "false");
                insertdata.finalize();
            }
        });
    },
};