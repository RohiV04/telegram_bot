const axios = require("axios");
const e = require("express");
const translate = (bot) => {
  let languageOptions = [
    ["English", "Spanish", "French", "German"],
    ["Italian", "Russian", "Japanese", "Chinese"],
    ["Korean", "Arabic", "Hindi", "Turkish"],
    ["Malayalam", "Tamil", "Telugu", "Kannada"],
    ["Marathi", "Gujarati", "Bengali", "Urdu"],
    ["Punjabi", "Nepali"],
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
    Malayalam: "ml",
    Tamil: "ta",
    Telugu: "te",
    Kannada: "kn",
    Marathi: "mr",
    Gujarati: "gu",
    Bengali: "bn",
    Urdu: "ur",
    Punjabi: "pa",
    Nepali: "ne",
    // Sinhala: "si",
    // Filipino: "fil",
    // Indonesian: "id",
    // Vietnamese: "vi",
    // Thai: "th",
    // Polish: "pl",
    // Romanian: "ro",
    // Dutch: "nl",
    // Swedish: "sv",
    // Finnish: "fi",
    // Norwegian: "no",
    // Danish: "da",
    // Greek: "el",
    // Czech: "cs",
    // Slovak: "sk",
    // Ukrainian: "uk",
    // Hungarian: "hu",
    // Hebrew: "he",
    // Persian: "fa",
    // Afrikaans: "af",
    // Swahili: "sw",
    // Latin: "la",
    // Esperanto: "eo",
    // Catalan: "ca",
  };

  bot.onText(/\/translate/, (msg) => {
    bot.sendMessage(msg.chat.id, "Select the language", {
      reply_markup: {
        keyboard: languageOptions,
      },
    });
  });
  // Listen for incoming messages
  bot.on("message", (msg) => {
    const chatId = msg.chat.id;

    // Check if the message is a language selection
    if (msg.text in languageCodes === true) {
      bot.sendMessage(chatId, "Enter the text to translate");
      const languageId = languageCodes[msg.text];
      // Translate the text
      bot.once("message", async (msg) => {
        const chatId = msg.chat.id;
        const encodedParams = new URLSearchParams();
        encodedParams.set("source_language", "en");
        encodedParams.set("target_language", languageId);
        encodedParams.set("text", msg.text);

        const options = {
          method: "POST",
          url: "https://text-translator2.p.rapidapi.com/translate",
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            "X-RapidAPI-Key":
              "e4d4507831msh8daf27e079eeb5cp15df2ejsn008380f9d487",
            "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
          },
          data: encodedParams,
        };

        try {
          const response = await axios.request(options);
          console.log(response.data);
          const translatedText = response.data.data.translatedText;
          bot.sendMessage(chatId, `Translated Text    ${translatedText}`);
        } catch (error) {
          console.error(error);
          bot.sendMessage(chatId, "Error translating text");
        }
      });
    } else {
      bot.sendMessage(msg.chat.id, "Select the language", {
        reply_markup: {
          keyboard: languageOptions,
        },
      });
    }
  });
};

module.exports = translate;
