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
    let db = new sqlite.Database('./database.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
    db.run(`CREATE TABLE IF NOT EXISTS users (
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
    let db = new sqlite.Database('./database.db', sqlite.OPEN_READWRITE);
    if (message.content.startsWith('!')) return;
    if (message.author.bot) return;
    let query = `SELECT * FROM users WHERE userid = ?`;
    db.get(query, [userid], (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        if (row === undefined) {
            let insertdata = db.prepare(`INSERT INTO users VALUES(?,?,?,?)`);
            insertdata.run(userid, username, "0", "1");
            insertdata.finalize();
            db.close();
            return;
        } else {
            db.run(`UPDATE users SET xp = xp + 1.5 WHERE userid = ?`, [message.author.id]), function (err) {
                if (err) {
                      console.log(err);
                }
            }
        }
    });
});
client.on(`message`, (message) => {
    if (message.content.startsWith('!')) return;
    if (message.author.bot) return;
    let db = new sqlite.Database('./database.db', sqlite.OPEN_READWRITE);
    db.get(`SELECT * FROM users WHERE userid = ?`, [message.author.id], (err, row) => {
        const nxtLvl = 500 * (Math.pow(2, row.lvl) - 1);
        if (row.xp >= nxtLvl) {
            db.run(`UPDATE users SET lvl = lvl + 1 WHERE userid = ?`, [message.author.id]), function (err) {
                console.log(err);
            }
            db.run(`UPDATE users SET xp = xp - ${nxtLvl} WHERE userid = ?`, [message.author.id]), function (err) {
                console.log(err);
            }
            message.channel.send(`<@${message.author.id}>, вы повысили свой уровень до '${row.lvl + 1}'!`);
        }
    })
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
        message.reply('Здесь возникла проблема с командой!');
    }

});

client.login('token');
