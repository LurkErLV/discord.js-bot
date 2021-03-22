const sqlite = require('sqlite3').verbose();
let db = require('../utils/db.js');

module.exports = {
    name: 'setstat',
    description: 'XP and LVL system command!',
    execute(message, args) {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            const stats = message.content.split(' ').slice(1);
            const target = message.mentions.users.first();
            if (target === undefined) {
                message.channel.send(`<@${message.author.id}>, укажите пользователя!`);
                return;
            }
            if (stats[1] === 'lvl') {
                db.run(`UPDATE users SET lvl = ? WHERE userid = ?`, [stats[2], target.id]), function (err) {
                    console.log(err);
                }
                message.channel.send(`У пользователя <@${target.id}> изменили уровень на '${stats[2]}'!`);
                console.log(`${message.author.tag} changed the LVL to ${stats[2]} for the ${target.tag}!`);
            } else if (stats[1] === 'xp') {
                db.run(`UPDATE users SET xp = ? WHERE userid = ?`, [stats[2], target.id]), function (err) {
                    console.log(err);
                }
                message.channel.send(`У пользователя <@${target.id}> изменили опыт на '${stats[2]}'!`);
                console.log(`${message.author.tag} changed the XP to ${stats[2]} for the ${target.tag}!`);
            } else if (stats[1] === 'money') {
                db.run(`UPDATE users SET money = ? WHERE userid = ?`, [stats[2], target.id]), function (err) {
                    console.log(err);
                }
                message.channel.send(`У пользователя <@${target.id}> изменили количество денег на '${stats[2]}'!`);
                console.log(`${message.author.tag} changed the MONEY to ${stats[2]} for the ${target.tag}!`);
            } else if (stats[1] === 'admin') {
                if (stats[2] === 'true') {
                    db.run(`UPDATE users SET admin = ? WHERE userid = ?`, [stats[2], target.id]), function (err) {
                        console.log(err);
                    }
                    message.channel.send(`Пользователю <@${target.id}> выдали права администратора!`);
                    console.log(`${message.author.tag} changed ADMIN to ${stats[2]} for the ${target.tag}!`);
                } else {
                    db.run(`UPDATE users SET admin = ? WHERE userid = ?`, [stats[2], target.id]), function (err) {
                        console.log(err);
                    }
                    message.channel.send(`У пользователя <@${target.id}> забрал права администратора!`);
                    console.log(`${message.author.tag} changed the ADMIN to ${stats[2]} for the ${target.tag}!`);
                }
            } else {
                message.channel.send(`Неизвестный параметр '${stats[2]}'!`);
            }
        } else {
            message.channel.send(`У вас не хватает прав!`);
        }
    }
};