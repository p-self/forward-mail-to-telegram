// process.env.http_proxy = "http://127.0.0.1:8888"
// process.env.https_proxy = "http://127.0.0.1:8888"

const TelegramBot = require('node-telegram-bot-api');
const token = process.argv[2];

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
    bot.sendMessage(chatId, resp);
});

// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;
//     bot.sendMessage(chatId, 'Received your message');
// });
module.exports = {
    sendMessage(message){
        bot.sendMessage(process.argv[3], message);
    }
}


