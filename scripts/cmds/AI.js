const axios = require("axios");

module.exports.config = {
  name: "ai",
  version: "1",
  hasPermssion: 0,
  credits: "Grey",
  description: "ai",
  commandCategory: "ai",
  usages: "ai <ask>",
  cooldowns: 5,
};

module.exports.run = async function({ api, event, args }) {
  let { threadID, messageID, type, messageReply } = event;

  if (type === "message_reply" && messageReply.attachments[0]?.type === "photo") {
    const attachment = messageReply.attachments[0];
    const imageURL = attachment.url;
    try {
      const res = await axios.get(`https://api.heckerman06.repl.co/api/other/img2text?input=${encodeURIComponent(imageURL)}`);
      const response = res.data.extractedText;
      const resAI = await axios.get(`https://api.heckerman06.repl.co/api/other/openai-chat?newprompt=${response}`);
      const respondAI = resAI.data.content;
      api.sendMessage(respondAI, threadID, messageID);
    } catch (error) {
      api.sendMessage("Error occurred while fetching data from the API.", threadID, messageID);
    }
  } else {
    const response = args.join(" ");
    if (!response) {
      api.sendMessage("Hi! What can I do for you?", threadID, messageID);
      return;
    }
  
    try {
      const res = await axios.get(`https://api.heckerman06.repl.co/api/other/openai-chat?newprompt=${response}`);
      const respond = res.data.content;
      api.sendMessage(respond, threadID, messageID);
    } catch (error) {
      api.sendMessage("Error occurred while fetching data from the Chatgpt API.", threadID, messageID);
    }
  }
};
