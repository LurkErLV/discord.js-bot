const Discord = require("discord.js");

module.exports = {
  name: "stats",
  description: "XP and LVL System status command.",
  execute(message, args) {
    let db = require("../utils/db.js");

    db.all(`SELECT * FROM users WHERE userid = ?`, [message.author.id], (err, rows) => {
      if (err) {
        console.log(err);
      }
      if (rows[0].admin === 'true') {
        var admin = 'Да';
      } else {
        var admin = 'Нет';
      }
        const nxtLvl = 150 * (Math.pow(2, rows[0].lvl) - 1);
        const embed = new Discord.MessageEmbed()
        .setTitle(`Информация о ${message.author.username}`)
        .setTimestamp()
        .setColor('#fff')
        .setFooter(`Message author: ${message.author.username} • Server: ${message.guild.name}`)
        .addFields(
          {
            name: 'Администратор?',
            value: admin,
          },
          {
            name: 'Уровень',
            value: rows[0].lvl,
          },
          {
            name: 'Опыт',
            value: rows[0].xp,
          },
          {
            name: 'Нужно для повышения',
            value: nxtLvl
          },
          {
            name: 'Денег',
            value: rows[0].money,
          }
        )
      message.channel.send(embed);
    });
  },
};
