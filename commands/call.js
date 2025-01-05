module.exports = (bot) => {
  const adminId = '7027291897'; // Remplacez par votre ID Telegram

  bot.command('call', async (ctx) => {
    const message = ctx.message.text.split(' ').slice(1).join(' ');

    if (!message) {
      return ctx.reply('Veuillez écrire un message à envoyer à l\'administrateur, comme : /call Bonjour, j\'ai un problème.');
    }

    try {
      // Envoyer le message à l'admin
      await bot.telegram.sendMessage(adminId, `Message de l'utilisateur ${ctx.from.id} (@${ctx.from.username || 'inconnu'}) :\n\n${message}`);
      ctx.reply('Votre message a été envoyé à l\'administrateur.');
    } catch (error) {
      ctx.reply('Impossible d\'envoyer le message à l\'administrateur. Veuillez réessayer plus tard.');
      console.error('Erreur lors de l\'envoi du message à l\'admin :', error.message);
    }
  });
};
