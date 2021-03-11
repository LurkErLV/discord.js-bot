const ms = require('ms');
module.exports = {
    name: 'mute',
    description: 'User mute command.',
    execute(message, args) {
        if (message.member.roles.cache.some(r => r.id === '819588833422475277' || r.id === '819591866856505384')) {
            const target = message.mentions.users.first();
            if (target.id === message.author.id) {
                message.channel.send('Вы не можете заглушить себя!')
            } else if (target) {
                let muteRole = message.guild.roles.cache.find(role => role.id === '819610726201163796');
                let memberTarget = message.guild.members.cache.get(target.id);

                if (!args[1]) {
                    memberTarget.roles.add(muteRole.id);
                    message.channel.send(`Пользователь <@${memberTarget.user.id}> был заглушён пользователем <@${message.author.id}>`);
                    return;
                }

                memberTarget.roles.add(muteRole.id);
                message.channel.send(`Пользователь <@${memberTarget.user.id}> был заглушён пользователем <@${message.author.id}> на ${ms(ms(args[1]))}!`);

                setTimeout(function () {
                    memberTarget.roles.remove(muteRole.id);
                    message.channel.send(`У пользователья <@${memberTarget.user.id}> была снята заглушка по истечению времени!`);
                }, ms(args[1]));
            } else {
                message.channel.send('Пользователь не найден!')
            }
        } else {
            message.channel.send('Вам не хватает прав использовать данную команду!');
        }
    }
};