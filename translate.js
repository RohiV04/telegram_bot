const axios = require("axios");

const languageOptions = [
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

const sendLanguageSelectionMessage = (bot, chatId) => {
  bot.sendMessage(chatId, "Select the language", {
    reply_markup: {
      keyboard: languageOptions,
    },
  });
};

const translateText = async (bot, chatId, languageId, text) => {
  const encodedParams = new URLSearchParams();
  encodedParams.set("source_language", "en");
  encodedParams.set("target_language", languageId);
  encodedParams.set("text", text);

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
    const translatedText = response.data.data.translatedText;
    bot.sendMessage(chatId, `Translated Text: ${translatedText}`);
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, "Error translating text");
  }
};

const translate = (bot) => {
  bot.onText(/\/translate/, (msg) => {
    setTimeout(() => sendLanguageSelectionMessage(bot, msg.chat.id), 1000);
  });

  bot.on("message", (msg) => {
    const chatId = msg.chat.id;

    if (msg.text in languageCodes) {
      bot.sendMessage(chatId, "Enter the text to translate");
      const languageId = languageCodes[msg.text];

      bot.once("message", (msg) => {
        translateText(bot, chatId, languageId, msg.text);
      });
    } else {
      sendLanguageSelectionMessage(bot, msg.chat.id);
    }
  });
};

module.exports = translate;