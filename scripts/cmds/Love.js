module.exports = {
    config: {
        name: 'love',
        author: 'HASSAN-',
        version: 1.0,
        role: 0,
        shortDescription: {
            en: 'Spread love with beautiful messages.'
        },
        longDescription: {
            en: 'Sends lovely messages to brighten someone\s day.'
        },
        category: 'fun',
        guide: {
            en: 'Simply use the command to send a message of love.'
        }
    },
    event: null,
    onStart: async function({ api, event, args }) {
        const loveMessages = [
            'You are loved more than you know. 💖',
            'Your smile brightens up my day. 😊',
            'Sending you virtual hugs and love! 🤗❤',
            'You have a heart of gold. ✨💛',
            "I'm thinking of you and sending you all my love and positive vibes. 🤩💖",
            "You're amazing and deserving of all the love and happiness in the world. Here's some virtual love to brighten your day! 🤩💖",
            "I'm sending a virtual hug and a big dose of positive energy to keep shining your light! 😘💫",
            "I'm here for you and sending love and support. Virtual hugs and snuggles! 🤩💕",
            'I am worthy of love and respect regardless of my flaws or mistakes.',
            'I am deserving of happiness and success, and I am worthy of my dreams. 🌌',
            'I am strong and resilient, and I can overcome any obstacles that come my way.',
            'I am intelligent and capable of learning, growing, and improving every day. 🧑‍🎓',
            'I am enough, just the way I am. I don\t need to change for anyone else\s approval or acceptance. 😔',
            'Just a reminder: you are amazing just the way you are. 🌟'
        ];

        const randomLoveMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];

        api.sendMessage(randomLoveMessage, event.threadID);
    }
};
