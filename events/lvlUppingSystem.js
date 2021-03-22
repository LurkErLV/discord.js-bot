const fs = require('fs');
const Discord = require('discord.js');
const prefix = '!';

module.exports = {
  name: 'message',
  once: false,
  execute(message, client) {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix)) return;
    const db = require('../utils/db.js');
    db.get(`SELECT * FROM users WHERE userid = ?`, [message.author.id], (err, row) => {
      if (row !== undefined) {
        const nxtLvl = 10 * (Math.pow(2, row.lvl) - 1);
        if (row.xp >= nxtLvl) {
          db.run(`UPDATE users SET lvl = lvl + 1 WHERE userid = ?`, [message.author.id]), function(err) {
            console.log(err);
          };
          db.run(`UPDATE users SET xp = xp - ${nxtLvl} WHERE userid = ?`, [message.author.id]), function(err) {
            console.log(err);
          };
          message.channel.send(`<@${message.author.id}>, вы повысили свой уровень до '${row.lvl + 1}'!`);
        }
      }
    });
  },
};
