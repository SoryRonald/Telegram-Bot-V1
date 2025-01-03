const https = require('https');

// Ton token et ID
const TOKEN = '7546348683:AAECO7ClGJZfYbRnWMbSFUEs6DUuP5At9Hc';
const ADMIN_ID = 7728855185;

// Fonction pour envoyer un message via l'API Telegram
function sendMessage(chatId, text) {
  const url = `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;
  https.get(url, (res) => {
    res.on('data', (d) => process.stdout.write(d));
  }).on('error', (err) => console.error(err));
}

// Vérifie les mises à jour périodiquement
setInterval(() => {
  const url = `https://api.telegram.org/bot${TOKEN}/getUpdates`;
  https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      const updates = JSON.parse(data).result || [];
      updates.forEach((update) => {
        const message = update.message;
        if (!message || !message.text) return;

        const chatId = message.chat.id;
        const userId = message.from.id;

        const match = message.text.match(/\/notification (.+)/);
        if (match) {
          const notifMessage = match[1];
          if (userId === ADMIN_ID) {
            sendMessage(chatId, `📢 Notification : ${notifMessage}`);
          } else {
            sendMessage(chatId, "❌ Seul l'administrateur peut utiliser cette commande.");
          }
        }
      });
    });
  }).on('error', (err) => console.error(err));
}, 2000); // Vérifie toutes les 2 secondes
