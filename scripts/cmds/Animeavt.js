const fs = require('fs-extra');
const request = require('request');

module.exports = {
  config: {
    name: 'animeavt',
    aliases: [],
    author: 'Prince Sanel/kira',
    version: '69',
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: 'anime avatar',
    },
    longDescription: {
      en: 'anime avatar',
    },
    category: 'img',
    guide: {
      en: '{p}{n} [ID|TEXT|TEXT]',
    },
  },

  onStart: async function ({ api, event, args }) {
    try {
      const { threadID, messageID, senderID } = event;
      const content = args.join(' ').split('|').map(item => item.trim());
      const text1 = encodeURI(content[2]);
      const text = encodeURI(content[1]);
      const num = parseInt(content[0]);

      if (!text || !text1) {
        return api.sendMessage('[!] Add text to proceed.', threadID, messageID);
      }

      if (isNaN(num) || num > 882) {
        return api.sendMessage('[!] Invalid ID. Please use a number between 1 and 882.', threadID, messageID);
      }

      api.sendMessage('[!] PROCESSING, PLEASE WAIT...', threadID, messageID);

      const response = await downloadImage(num, text1, text);

      if (response) {
        const attachment = fs.createReadStream(__dirname + '/cache/avt1.png');
        api.sendMessage({ body: '', attachment }, threadID, () => {
          fs.unlinkSync(__dirname + '/cache/avt1.png');
        }, messageID);
      } else {
        api.sendMessage('[!] An error occurred while processing the image.', threadID, messageID);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage('[!] An error occurred. Please try again later.', threadID, messageID);
    }
  },
};

async function downloadImage(num, text1, text) {
  return new Promise((resolve) => {
    request(encodeURI(`https://sakibin.sinha-apiv2.repl.co/taoanhdep/avatarwibu?id=${num}&chu_nen=${text1}&chu_ky=${text}`))
      .pipe(fs.createWriteStream(__dirname + '/cache/avt1.png'))
      .on('close', () => resolve(true))
      .on('error', () => resolve(false));
  });
}
