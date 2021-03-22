module.exports = {
    name: 'adddb',
    description: 'Manual adding to DB',
    execute(message, args) {
        let db = require('../utils/db.js');

    db.get(`SELECT * FROM users WHERE userid = ?`, [message.author.id], (err, row) => {
      if (err) {
        console.log(err);
        return;
      }
      if (row.admin === 'true') {
        const target = message.mentions.users.first();
        if (target === undefined){
            message.channel.send(`<@${message.author.id}>, укажите пользователя!`)
        } else {
        db.get(`SELECT * FROM users WHERE userid = ?`, [target.id], (err, row) => {
            if (row === undefined) {
                let insertdata = db.prepare(`INSERT INTO users VALUES(?,?,?,?,?,?)`);
                insertdata.run(target.id, target.tag, "0", "1", "500", "false");
                insertdata.finalize();
                message.channel.send(`Пользователь <@${target.id}> был добавлен в базу данных!`);
            } else {
                message.channel.send(`Пользователь <@${target.id}> уже находиться в базе данных!`);
            }
        });
    }
       } else {
        message.channel.send("Вам не хватает прав использовать данную команду!");
       }
    });
    }
};