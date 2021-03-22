module.exports = {
  name: 'clear',
  description: 'Clear messages!',
  async execute(message, args) {
    const db = require('../utils/db.js');


    db.get(`SELECT * FROM users WHERE userid = ?`, [message.author.id], (err, row) => {
      if (err) {
        console.log(err);
        return;
      }
      if (row.admin === 'true') {
        if (!args[0]) return message.reply('Укажите количество удаляемых сообщений!');

        if (isNaN(args[0])) return message.reply('Введите реальное число!');

        if (args[0] > 100) return message.reply('Вы не можете удалить больше 100 сообщений!');

        if (args[0] < 1) return message.reply('Вы не можете удалить меньше 1 сообщения!');

        message.channel.messages.fetch({limit: args[0]}).then((messages) => {
          message.channel.bulkDelete(messages);
        });
      }
    });
  },
};
