const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const prefix = '!';
const sqlite = require('sqlite3').verbose();


client.on('ready', () => {
    console.log('Bot is ready!');
    console.log(`Loaded ${commandFiles.length} commands!`);
    client.user.setPresence({ activity: { name: 'бога!', type: 'PLAYING' }, status: 'online' }); // Bot Rich Presence options
    let db = new sqlite.Database('./db.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
    db.run(`CREATE TABLE IF NOT EXISTS data (
        userid INTEGER NOT NULL,
        username TEXT NOT NULL,
        xp INTEGER NOT NULL,
        lvl INTEGER NOT NULL
        )`);
    console.log('Database is connected!')
});

client.on(`message`, (message) => {
    let msg = message.content.toLowerCase();
    let userid = message.author.id;
    let username = message.author.tag;
    if (message.author.bot) return;
    let db = new sqlite.Database('./db.db', sqlite.OPEN_READWRITE);

        let query = `SELECT * FROM data WHERE userid = ?`;
        db.get(query, [userid], (err, row) => {
            if (err) {
                console.log(err);
                return;
            }
            if (row === undefined) {
                let insertdata = db.prepare(`INSERT INTO data VALUES(?,?,?,?)`);
                insertdata.run(userid, username, "0", "0");
                insertdata.finalize();
                db.close();
                return;
            }
        });
    //console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);
});

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
        client.commands.get(command).execute(message, args);
    } catch {
        message.reply('Здесь возникла проблема с командой, напишите разработчику о проблеме!');
    }

});

client.login('token');
