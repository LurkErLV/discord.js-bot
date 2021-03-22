const {Discord, MessageEmbed, MessageReaction} = require('discord.js');

module.exports = {
  name: 'coinflip',
  description: 'Coinflip',
  execute(message, args) {
    const randomInt = Math.floor(Math.random(1, 2));
    if (randomInt === 1) {
      var result = 'орёл';
    } else {
      var result = 'решка';
    }
    const embed = new Discord.MessageEmbed()
        .setTitle('Coinflip!')
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setColor('#fff')
        .setDescription(`В игре орёл и решка, выпал ${result}!`)
        .setFooter(`Message author: ${message.author.username} • Server: ${message.guild.name}`)
        .setTimestamp();

    message.channel.send(embed);
  },
};
