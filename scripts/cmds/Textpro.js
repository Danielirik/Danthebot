const fs = require('fs-extra');
const request = require('request');

module.exports = {
  config: {
    name: "textpro",
    aliases: [],
    author: "Prince Sanel/kira",
    version: "69",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: "create logo"
    },
    longDescription: {
      en: "create logo (basta tinatamad ako)"
    },
    category: "img",
    guide: {
      en: "{p}{n} [id/text]"
    },
    dependencies: {
      "fs-extra": "",
      "request": ""
    }
  },

  onStart: async function ({ api, event, args }) {
    const { threadID, messageID, senderID, body } = event;
    const num = args[0];
    const message = args.slice(1).join(' ');

    if (num > 181) return api.sendMessage("[!] 181 is the limit.", event.threadID, event.messageID);
    if (isNaN(num)) return api.sendMessage("[!] Please provide a number, not a letter.", event.threadID, event.messageID);
    if (!message) return api.sendMessage("[!] Add text to proceed.", event.threadID, event.messageID);
    api.sendMessage("[!] PROCESSING PLEASE WAIT...", event.threadID, event.messageID);

    const callback = () => api.sendMessage({ body: '', attachment: fs.createReadStream(__dirname + "/cache/textpro.png") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/textpro.png"), event.messageID);

    return request(encodeURI(`https://sakibin.sinha-apiv2.repl.co/api/textpro?number=${num}&text=${message}&apikey=SAKIBIN-FREE-SY6B4X`))
      .pipe(fs.createWriteStream(__dirname + '/cache/textpro.png'))
      .on('close', () => callback());
  }
};
