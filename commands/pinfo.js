const Discord = require("discord.js");

module.exports = {
    name: "pinfo",
    description: "Info about person",
    async execute(message, args) {
        const { guild, channel } = message;

        const user = message.mentions.users.first() || message.member.user;
        const member = guild.members.cache.get(user.id);

        const embed = new Discord.MessageEmbed()
            .setAuthor(`Информация о ${user.username}!`, user.displayAvatarURL())
            .addFields({
                name: 'Тэг пользователя',
                value: user.tag,
            },
                {
                    name: 'Пользователь бот?',
                    value: user.bot ? "Да" : "Нет",
                },
                {
                    name: 'Никнейм на сервере',
                    value: member.nickname || 'Нету',
                },
                {
                    name: 'Присоединился к серверу:',
                    value: new Date(member.joinedTimestamp).toLocaleDateString(),
                },
                {
                    name: 'Присоединился к Дискорду:',
                    value: new Date(user.createdTimestamp).toLocaleDateString(),
                },
                {
                    name: 'Количетво ролей:',
                    value: member.roles.cache.size - 1,
                }
            );

        channel.send(embed);
    },
};