const Discord = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Help command!',
  execute(message, args) {
    const db = require('../utils/db.js');

    db.all(`SELECT * FROM users WHERE userid = ?`, [message.author.id], (err, rows) => {
      if (err) {
        console.log(err);
      }
      if (rows[0].admin === 'true') {
        const embed = new Discord.MessageEmbed()
            .setTitle(`Administrator help`)
            .setTimestamp()
            .setColor('#fff')
            .setFooter(`Message author: ${message.author.username} • Server: ${message.guild.name}`)
            .addFields(
                {
                  name: '!mute',
                  value: '@<пользователь> время причина',
                },
                {
                  name: '!unmute',
                  value: '@<пользователь>',
                },
                {
                  name: '!ban',
                  value: '@<пользователь>',
                },
                {
                  name: '!kick',
                  value: '@<пользователь>',
                },
                {
                  name: '!giverole',
                  value: '@<пользователь> название_роли',
                },
                {
                  name: '!takerole',
                  value: '@<пользователь> название_роли',
                },
                {
                  name: '!serverinfo',
                  value: 'нет аргументов',
                },
                {
                  name: '!pinfo',
                  value: '@<пользователь> (пользователь но обязателен)',
                },
                {
                  name: '!coinflip',
                  value: 'нет аргументов',
                },
                {
                  name: '!stats',
                  value: 'нет аргументов',
                },
                {
                  name: '!setstat',
                  value: '@<пользователь> exp/lvl/money/admin значение',
                },
            );
        message.channel.send(embed);
      } else {
        const embed = new Discord.MessageEmbed()
            .setTitle(`Help`)
            .setTimestamp()
            .setColor('#fff')
            .setFooter(`Message author: ${message.author.username} • Server: ${message.guild.name}`)
            .addFields(
                {
                  name: '!serverinfo',
                  value: 'нет аргументов',
                },
                {
                  name: '!pinfo',
                  value: '@<пользователь> (пользователь но обязателен)',
                },
                {
                  name: '!coinflip',
                  value: 'нет аргументов',
                },
                {
                  name: '!stats',
                  value: 'нет аргументов',
                },
            );
        message.channel.send(embed);
      }
    });
  },
};
