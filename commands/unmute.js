module.exports = {
  name: "unmute",
  description: "User unmute command.",
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
          message.channel.send("Вы не можете снять заглушку с себя!");
        } else if (target) {
          let muteRole = message.guild.roles.cache.find(
            (role) => role.id === "815037254400475186"
          );

          let memberTarget = message.guild.members.cache.get(target.id);

          memberTarget.roles.remove(muteRole.id);
          message.channel.send(
            `У пользователья <@${memberTarget.user.id}> была снята заглушка пользователем <@${message.author.id}>!`
          );
        } else {
          message.channel.send("Пользователь не найден!");
        }
      } else {
        message.channel.send("Вам не хватает прав использовать данную команду!");
      }
    });
  },
};

