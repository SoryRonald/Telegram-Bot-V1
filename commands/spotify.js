const { exec } = require('child_process');
const fs = require('fs');
const https = require('https');

// Ton token Telegram
const TELEGRAM_TOKEN = '7546348683:AAECO7ClGJZfYbRnWMbSFUEs6DUuP5At9Hc';

// Fonction pour envoyer un message
function sendMessage(chatId, text) {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;
  https.get(url).on('error', (err) => console.error(err));
}

// Fonction pour envoyer un fichier audio
function sendAudio(chatId, filePath, title) {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendAudio`;
  const fileStream = fs.createReadStream(filePath);

  const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
  const postData = [
    `--${boundary}`,
    'Content-Disposition: form-data; name="chat_id"',
    '',
    chatId,
    `--${boundary}`,
    'Content-Disposition: form-data; name="title"',
    '',
    title,
    `--${boundary}`,
    `Content-Disposition: form-data; name="audio"; filename="${filePath}"`,
    'Content-Type: audio/mpeg',
    '',
    fileStream.read().toString(),
    `--${boundary}--`,
  ].join('\r\n');

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
      'Content-Length': Buffer.byteLength(postData),
    },
  };

  const req = https.request(url, options, (res) => {
    res.on('data', (d) => process.stdout.write(d));
  });

  req.on('error', (error) => console.error(error));
  req.write(postData);
  req.end();
}

// Vérifie les mises à jour périodiquement
setInterval(() => {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/getUpdates`;
  https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => (data += chunk));
    res.on('end', () => {
      const updates = JSON.parse(data).result || [];
      updates.forEach((update) => {
        const message = update.message;
        if (!message || !message.text) return;

        const chatId = message.chat.id;

        const match = message.text.match(/\/spotify (.+)/);
        if (match) {
          const query = match[1];
          const audioFile = `${query}.mp3`;

          // Télécharge l'audio avec youtube-dl
          exec(`youtube-dl --extract-audio --audio-format mp3 -o "${audioFile}" "ytsearch:${query}"`, (err) => {
            if (err) {
              console.error(err);
              sendMessage(chatId, "Erreur lors du téléchargement de la chanson.");
            } else {
              sendAudio(chatId, audioFile, query);
              // Supprime le fichier local après envoi
              fs.unlinkSync(audioFile);
            }
          });
        }
      });
    });
  }).on('error', (err) => console.error(err));
}, 2000); // Vérifie toutes les 2 secondes
