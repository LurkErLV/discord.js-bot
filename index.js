const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const prefix = '!';


client.once('ready', () => {
    console.log('Ready!');
    console.log(`Loaded ${commandFiles.length} commands!`)
});

client.on('message', message => {
	console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);
});

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;
    try {
        client.commands.get(command).execute (message, args);
    } catch {
        message.reply('Здесь возникла проблема с командой, напишите разработчику о проблеме!');
    }

});

client.login('ODE0NjY2MDU0Njg4NTcxNDcz.YDhK4w.5tl9h9FLP5GqZMVvU5WoXiTZq-w');
