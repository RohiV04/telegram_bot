const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const translate = require("./translate");
// replace the value below with the Telegram token you receive from @BotFather
const token = "6729574087:AAEfsxp8trqnN5VOBOJcvTm-7nJhyxO64Lo";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome",
    {
      "reply_markup": {
        "keyboard": [["/translate"]],
        "one_time_keyboard": true
      }
    }
  );

});

translate(bot);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


