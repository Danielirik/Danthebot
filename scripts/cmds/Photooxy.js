const fs = require('fs-extra'); 
const request = require('request'); 

module.exports = {
  config: {
    name: "photooxy",
    aliases: [],
    author: "Prince Sanel/kira", // hindi ito collab, ako kasi nag convert :>
    version: "69",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: "logo hihi",
    },
    longDescription: {
      en: "basta logo",
    },
    category: "img",
    guide: {
      en: "{p}{n} [id/text]",
    }
  },

  onStart: async function ({ api, event, args }) {
    const { threadID, messageID, senderID, body } = event;
    const num = args[0];
    const message = args.slice(1).join(' ');
    if (num > 15) return api.sendMessage("[!] 15 is the limit.", event.threadID, event.messageID);
    if (isNaN(num)) return api.sendMessage("[!] Please provide a number, not a letter.", event.threadID, event.messageID);
    if (!message) return api.sendMessage("[!] Add text to proceed.", event.threadID, event.messageID);
    api.sendMessage("[!] PROCESSING PLEASE WAIT...", event.threadID, event.messageID);

    var callback = () => api.sendMessage({ body: "", attachment: fs.createReadStream(__dirname + "/cache/photooxy.png") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/photooxy.png"), event.messageID);
    return request(encodeURI(`https://sakibin.sinha-apiv2.repl.co/api/photooxy/${num}?text=${message}&apikey=SAKIBIN-FREE-SY6B4X`))
      .pipe(fs.createWriteStream(__dirname + '/cache/photooxy.png'))
      .on('close', () => callback());
  },
};
