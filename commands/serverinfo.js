module.exports = {
    name: "serverinfo",
    description: "Server Info",
    execute(message, args) {
        const embed = new Discord.MessageEmbed()
            .setTitle('Server Info')
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setColor("#fff")
            .addFields(
                { name: 'Server ID:', value: `${message.guild.id}`, inline: false },
                { name: 'Members Count:', value: `${message.guild.memberCount}`, inline: false },
                { name: 'Region:', value: `${message.guild.region}`.toUpperCase(), inline: false },
                { name: 'Boost LVL:', value: `${message.guild.premiumTier}`, inline: false },
                { name: 'Boost Count:', value: `${message.guild.premiumSubscriptionCount}`, inline: false }
            )
            .setTimestamp()
            .setFooter(`Message author: ${message.author.username} • Server: ${message.guild.name}`);

        message.channel.send(embed);
    },
};