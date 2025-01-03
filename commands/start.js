module.exports = (bot) => {
  bot.command('start', (ctx) => {
    const userName = ctx.from.first_name;

    const welcomeMessage = `Bonjour ${userName} \n\nEt bienvenue à vous créature supérieure. \nMoi c'est FadilChatbot. \nJe suis à votre service. \nVous voulez voir ce que je peux faire ?\n\nTapez /help 😇☺️ \n\nVeuillez s'il vous plaît contacter @fadil_uchiha si le bot rencontre des problèmes.`;

    ctx.reply(welcomeMessage);
  });
};
