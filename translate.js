const axios = require("axios");
const translate=(bot)=>{

let languageOptions = [
    ["English", "Spanish", "French", "German"],
    ["Italian", "Russian", "Japanese", "Chinese"],
    ["Korean", "Arabic", "Hindi", "Turkish"],
  ];

// Dictionary to map language options to their corresponding codes
const languageCodes = {
    English: "en",
    Spanish: "es",
    French: "fr",
    German: "de",
    Italian: "it",
    Russian: "ru",
    Japanese: "ja",
    Chinese: "zh",
    Korean: "ko",
    Arabic: "ar",
    Hindi: "hi",
    Turkish: "tr",
  };

  bot.onText(/\/translate/, (msg) => {
    bot.sendMessage(msg.chat.id, "Select the language", {
      reply_markup: {
        keyboard: languageOptions,
      },
    });
  });
  // Listen for incoming messages
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
  
    // Check if the message is a language selection
    if (language.flat().includes(msg.text)) {
      bot.sendMessage(chatId, msg.text);
      bot.sendMessage(chatId, "Enter the text to translate");
      const languageId = languageCodes[msg.text];    
      // Translate the text
      const encodedParams = new URLSearchParams();
      encodedParams.set("source_language", "en");
      encodedParams.set("target_language", "languageId");
      encodedParams.set("text", msg.text);
  
      const options = {
        method: "POST",
        url: "https://text-translator2.p.rapidapi.com/translate",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key": "e4d4507831msh8daf27e079eeb5cp15df2ejsn008380f9d487",
          "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
        },
        data: encodedParams,
      };
  
      try {
        const response = await axios.request(options);
        bot.sendMessage(chatId, response.data);
      } catch (error) {
        console.error(error);
      }
    }
  });
}
  module.exports = translate;