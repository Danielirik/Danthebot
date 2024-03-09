module.exports = {
  config: {
    name: "hello",
    aliases: ["hi", "greetings"],
    author: "Hassan-",
    version: 1.0,
    role: 0,
    shortDescription: {
      en: "Says hello to the user."
    },
    longDescription: {
      en: "Responds with a greeting to the user invoking the command."
    },
    category: "general",
    guide: {
      en: "Just use the command and the bot will greet you!"
    }
  },
  event: null,
  onStart: async function ({ api, event }) {
    api.sendMessage("Hello! 👋 How can I assist you today?", event.threadID);
  },
  onChat: async function ({ event, message }) {
    if (event.body && (event.body.toLowerCase() === "hello" || event.body.toLowerCase() === "hi")) {
      message.reply("Hello there! 👋");
    }
  }
};
