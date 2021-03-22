const fs = require('fs');
const commandFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith('.js'));

module.exports = {
    name: 'ready',
    once: true,
    execute() {
        console.log('Bot is ready!');
        console.log(`Loaded ${commandFiles.length} commands!`);
        let db = require('../utils/db.js');
        db.run(`CREATE TABLE IF NOT EXISTS users (userid INTEGER NOT NULL, username TEXT NOT NULL, xp INTEGER NOT NULL, lvl INTEGER NOT NULL, money INTEGER NOT NULL, admin INTEGER NOT NULL)`);
        console.log('Database is connected!')
    },
};