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
// // Matches "/echo [whatever]"
// bot.onText(/\/echo (.+)/, (msg, match) => {
//   // 'msg' is the received Message from Telegram
//   // 'match' is the result of executing the regexp above on the text content
//   // of the message

//   const chatId = msg.chat.id;
//   const resp = match[1]; // the captured "whatever"

//   // send back the matched "whatever" to the chat
//   bot.sendMessage(chatId, resp);
// });

// // Listen for any kind of message. There are different kinds of
// // messages.
// // bot.on("message", (msg) => {
// //   const chatId = msg.chat.id;

// //   // send a message to the chat acknowledging receipt of their message
// //   bot.sendMessage(chatId, "Hello");
// // });



// // Keyboard Functionality
// bot.onText(/\/help/, (msg) => {
//   bot.sendMessage(msg.chat.id, "Welcome", {
//     reply_markup: {
//       keyboard: [["Sample text", "Second sample"], ["Keyboard"], ["I'm robot"]],
//     },
//   });
// });

// //send a photo
// bot.onText(/\/pic/, (msg) => {
//   bot.sendPhoto(
//     msg.chat.id,
//     "https://www.7movierulz.so/poster/tiger-nageswara-rao-2023-dvdscr-telugu-full-movie-watch-online-free.jpg"
//   );
// });

// //send a document
// bot.onText(/\/doc/, (msg) => {
//   bot.sendDocument(
//     msg.chat.id,
//     "./../../../Documents/Certificates/Coursera GenAi.pdf"
//   );
// });

// //send a audio
// bot.onText(/\/audio/, (msg) => {
//   bot.sendAudio(
//     msg.chat.id,
//     "https://www.7movierulz.so/poster/tiger-nageswara-rao-2023-dvdscr-telugu-full-movie-watch-online-free.jpg"
//   );
// });

// //send a video
// bot.onText(/\/video/, (msg) => {
//   bot.sendVideo(
//     msg.chat.id,
//     "./../../../Downloads/Telegram Desktop/001 - The Day I Became a Shinigami.mkv",
//     { contentType: "video/mp4" }
//   );
// });

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
