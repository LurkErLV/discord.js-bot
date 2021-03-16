module.exports = {
  name: "unmute",
  description: "User unmute command.",
  execute(message, args) {
    if (
      message.member.hasPermission("ADMINISTRATOR") ||
      message.member.hasPermission("MUTE_MEMBERS")
    ) {
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
  },
};
