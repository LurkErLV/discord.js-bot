const Discord = require("discord.js");

module.exports = {
    name: "kick",
    description: "Kick command",
    execute(message, args) {
        const { member, mentions } = message;

        if (
            message.member.hasPermission('ADMINISTRATOR') ||
            message.member.hasPermission('KICK_MEMBERS')
        ) {
            const target = message.mentions.users.first();
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id);
                targetMember.kick();
                const embed = new Discord.MessageEmbed()
                    .setTitle('Kick!')
                    .setDescription(`Пользователь <@${message.author.id}> выгнал <@${target.id}>!`)
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .setColor("#fff")
                    .setTimestamp()
                    .setFooter(`Message author: ${message.author.username} • Server: ${message.guild.name}`);
                message.channel.send(embed);
            } else {
                message.channel.send(`<@${message.author.id}>, укажите пользователя чтобы выгнать!`)
            }
        } else {
            message.channel.send(`<@${message.author.id}>, у вас не хватает прав!`)
        }
    },
};