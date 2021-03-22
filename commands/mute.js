const ms = require("ms");
module.exports = {
  name: "mute",
  description: "User mute command.",
  execute(message, args) {
    let db = require('../utils/db.js');

    db.get(`SELECT * FROM users WHERE userid = ?`, [message.author.id], (err, row) => {
      if (err) {
        console.log(err);
        return;
      }
      if (row.admin === 'true') {
        const target = message.mentions.users.first();
        if (target.id === message.author.id) {
          message.channel.send("Вы не можете заглушить себя!");
        } else if (target) {
          let muteRole = message.guild.roles.cache.find(
            (role) => role.id === "815037254400475186"
          );
          let memberTarget = message.guild.members.cache.get(target.id);

          if (!args[1]) {
            memberTarget.roles.add(muteRole.id);
            message.channel.send(
              `Пользователь <@${memberTarget.user.id}> был заглушён пользователем <@${message.author.id}>`
            );
            console.log(`${message.author.tag} muted a ${target.tag}!`);
            return;
          }

          memberTarget.roles.add(muteRole.id);
          message.channel.send(
            `Пользователь <@${memberTarget.user.id
            }> был заглушён пользователем <@${message.author.id}> на ${ms(
              ms(args[1])
            )}!`
          );
          console.log(`${message.author.tag} muted a ${target.tag} for ${ms(ms(args[1]))}`);

          setTimeout(function () {
            memberTarget.roles.remove(muteRole.id);
            message.channel.send(
              `У пользователья <@${memberTarget.user.id}> была снята заглушка по истечению времени!`
            );
          }, ms(args[1]));
        } else {
          message.channel.send("Пользователь не найден!");
        }
      } else {
        message.channel.send("Вам не хватает прав использовать данную команду!");
      }
    });
  },
};
