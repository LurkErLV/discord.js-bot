const sqlite = require("sqlite3").verbose();
const Discord = require("discord.js");

module.exports = {
  name: "status",
  description: "XP and LVL System status command.",
  execute(message, args) {
    let db = require("../utils/db.js");

    db.all(`SELECT * FROM users WHERE userid = ?`, [message.author.id], (err, rows) => {
      if (err) {
        console.log(err);
      }
      const embed = new Discord.MessageEmbed()
        .setTitle(`Информация о ${message.author.username}`)
        .setTimestamp()
        .setColor('#fff')
        .setFooter(`Message author: ${message.author.username} • Server: ${message.guild.name}`)
        .addFields(
          {
            name: 'Уровень',
            value: rows[0].lvl,
          },
          {
            name: 'Опыт',
            value: rows[0].xp,
          }
        )
        message.channel.send(embed);
    });
  },
};
