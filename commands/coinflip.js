module.exports = {
    name: "coinflip",
    description: "Coinflip",
    execute(message, args) {
        const randomInt = Math.round(Math.random(1, 2));
        if (randomInt === 1) {
            var result = 'орёл';
        } else {
            var result = 'решка';
        }
        const embed = new Discord.MessageEmbed()
            .setTitle('Орёл и решка!')
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setColor("#fff")
            .setTimestamp()
            .setDescription(`В игре орёл и решка, выпала ${result}!`)
            .setFooter(`Message author: ${message.author.username} • Server: ${message.guild.name}`);

        message.channel.send(embed);
    },
};