const sqlite = require('sqlite3').verbose();
let db = new sqlite.Database('./database.db', sqlite.OPEN_READWRITE);

module.exports = {
    name: 'setstat',
    description: 'XP and LVL system command!',
    execute(message, args) {
        if (message.member.hasPermission('ADMINISTRATOR')) {
        const stats = message.content.split(' ').slice(1);
        const target = message.mentions.users.first();
        if (target === undefined){
            message.channel.send(`<@${message.author.id}>, укажите пользователя!`);
            return;
        }
        if (stats[1] === 'lvl') {
            db.run(`UPDATE users SET lvl = ? WHERE userid = ?`, [stats[2], target.id]), function (err) {
                console.log(err);
            }
            message.channel.send(`У пользователя <@${target.id}> изменили уровень на '${stats[2]}'!`);
        } else if (stats[1] === 'xp') {
            db.run(`UPDATE users SET xp = ? WHERE userid = ?`, [stats[2], target.id]), function (err) {
                console.log(err);
            }
            message.channel.send(`У пользователя <@${target.id}> изменили опыт на '${stats[2]}'!`);
        } else {
            message.channel.send(`Неизвестный параметр '${stats[2]}'!`);
        }
    } else {
        message.channel.send(`У вас не хватает прав!`)
    }
}
};