module.exports = {
    name: 'pay',
    description: 'Pay command',
    execute(message, args) {
        const stats = message.content.split(' ').slice(1);
        const target = message.mentions.users.first();

        if (target === undefined) {
            message.channel.send(`<@${message.author.id}>, укажите пользователя!`)
            return;
        }
        let db = require('../utils/db.js');
        db.get(`SELECT * FROM users WHERE userid = ?`, [message.author.id], (err, row) => {
            if (row.money < stats[1]) {
                message.channel.send(`<@${message.author.id}>, у вас не хватает денег!`);
            } else {
                db.run(`UPDATE users SET money = money - ? WHERE userid = ?`, [stats[1], message.author.id], (err, row) => {
                });
                db.run(`UPDATE users SET money = money + ? WHERE userid = ?`, [stats[1], target.id], (err, row) => {
                })
                message.channel.send(`Пользователь <@${message.author.id}> перевёл деньги в количестве '${stats[1]}' пользователю <@${target.id}>!`);
                console.log(`${message.author.tag} transferred ${stats[1]} money to the ${target.tag}!`)
            }
        });
    }
};