const axios = require('axios');

module.exports = {
  config: {
    name: "ai",
    version: 2.0,
    author: "OtinXSandip",
    longDescription: "chat with ai",
    category: "ai",
    guide: {
      en: "{p}{n} <Query>",
    },
  },
  onStart: async function ({ message, event, Reply, args, api, usersData }) {
    try {
      const id = event.senderID;
      const userData = await usersData.get(id);
      const name = userData.name;

      const ment = [{ id: id, tag: name }];
      const prompt = args.join(" ");
      const encodedPrompt = encodeURIComponent(prompt);
      api.setMessageReaction("⏰", event.messageID, () => {}, true);
      const response = await axios.get(`https://sandyapi.otinxsandeep.repl.co/api/ai?query= ${encodedPrompt}`);
      if (response.data && response.data.answer) {
        const lado = response.data.answer;
        api.setMessageReaction("✅", event.messageID, () => {}, true);
        message.reply({
          body: `${name}${lado}
you can reply for continue chatting 🩷`,
          mentions: ment,
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
          });
        });
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  },
  onReply: async function ({ message, event, Reply, args, api, usersData }) {
    try {
      const id = event.senderID;
      const userData = await usersData.get(id);
      const name = userData.name;

      const ment = [{ id: id, tag: name }];
      const prompt = args.join(" ");
      const encodedPrompt = encodeURIComponent(prompt);
     api.setMessageReaction("⏰", event.messageID, () => {}, true);
      const response = await axios.get(`https://sandyapi.otinxsandeep.repl.co/api/ai?query=${encodedPrompt}`);
      if (response.data && response.data.answer) {
        const lado = response.data.answer;
        api.setMessageReaction("✅", event.messageID, () => {}, true);
        message.reply({
          body: `${name} ${lado}
you can reply for continue chatting 🩷`,
          mentions: ment,
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
          });
        });
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
