const Discord = require("discord.js");

module.exports = {
    name: "serverinfo",
    description: "Info about server",
    async execute(message, args) {
        const { guild, channel } = message;

        const user = message.mentions.users.first() || message.member.user;
        const member = guild.members.cache.get(user.id);

        const embed = new Discord.MessageEmbed()
            .setAuthor(`Информация о ${message.guild.name}!`, message.guild.iconURL())
            .setTimestamp()
            .setColor("#fff")
            .setFooter(`Message author: ${message.author.username} • Server: ${message.guild.name}`)
            .addFields(
                {
                    name: 'Server ID',
                    value: message.guild.id,
                },
                {
                    name: 'Количество пользователей',
                    value: message.guild.memberCount,
                },
                {
                    name: 'Регион',
                    value: message.guild.region.toUpperCase(),
                },
                {
                    name: 'Уровень буста',
                    value: message.guild.premiumTier,
                },
                {
                    name: 'Количество бустов',
                    value: message.guild.premiumSubscriptionCount,
                }
            );

        channel.send(embed);
        //console.log(message.guild)
    },
};
