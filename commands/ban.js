const Discord = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'Ban command',
  execute(message, args) {
    const db = require('../utils/db.js');

    db.get(`SELECT * FROM users WHERE userid = ?`, [message.author.id], (err, row) => {
      if (err) {
        console.log(err);
        return;
      }
      if (row.admin === 'true') {
        const target = message.mentions.users.first();
        if (target) {
          const targetMember = message.guild.members.cache.get(target.id);
          targetMember.ban({days: 0, reason: `Забанен пользователем ${message.author.tag}!`});
          const embed = new Discord.MessageEmbed()
              .setTitle('Ban!')
              .setDescription(`Пользователь <@${message.author.id}> забанил <@${target.id}>!`)
              .setAuthor(message.guild.name, message.guild.iconURL())
              .setColor('#fff')
              .setTimestamp()
              .setFooter(`Message author: ${message.author.username} • Server: ${message.guild.name}`);
          message.channel.send(embed);
          console.log(`${message.author.tag} banned a ${target.tag}!`);
        } else {
          message.channel.send(`<@${message.author.id}>, укажите пользователя чтобы забанить!`);
        }
      } else {
        message.channel.send(`<@${message.author.id}>, у вас не хватает прав!`);
      }
    });
  },
};
