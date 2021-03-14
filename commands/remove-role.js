module.exports = {
    name: "takerole",
    description: "Taking roles command",
    execute(message, args) {
        const targetUser = message.mentions.users.first();
        if (!targetUser) {
            message.channel.send("Укажите пользователя, чтобы выдать роль!");
            return;
        }

        args.shift();

        const roleName = args.join(" ");
        const { guild } = message;

        const role = guild.roles.cache.find((role) => {
            return role.name === roleName;
        });
        if (!role) {
            message.channel.send(`Нет роли с названием "${roleName}"!`);
            return;
        } else {
            const member = guild.members.cache.get(targetUser.id);
            member.roles.remove(role);
            message.channel.send(`Пользователь <@${message.author.id}> забрад роль "${roleName}" у пользователя <@${targetUser.id}>!`);
        }
    },
};
