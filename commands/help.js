module.exports = (bot) => {
    bot.command('help', (ctx) => {
        const commands = [
            { command: '/ai', description: 'Poser des questions au bot' },
            { command: '/help', description: 'Afficher cette liste des commandes' },
            { command: '/admin', description: 'Voir la liste des administrateurs' },
            { command: '/addadmin <ID>', description: 'Ajouter un administrateur (Seul les admins peuvent utiliser)' },
            { command: '/removeadmin <ID>', description: 'Retirer un administrateur (Seul les admins peuvent utiliser)' },
            { command: '/translate <langue_source> <langue_cible> <texte>', description: 'Traduire un texte (Exemple : /translate fr en Bonjour)' },
            { command: '/start', description: 'Démarrage du bot' },
            { command: '/getid', description: 'Obtenez votre ID Telegram' },
            { command: '/imgbb', description: 'Transformer une image en lien' },
            { command: '/notify', description: 'Notifier l\'administrateur via une alerte (Seul les admins peuvent utiliser)' },
            { command: '/lyrics <artiste chanson>', description: 'Obtenir les paroles d\'une chanson (Exemple : /lyrics Tiakola Meuda)' },
            { command: '/out', description: 'Faire sortir le bot d\'un groupe (Seul les admins du bot peuvent utiliser)' },
            { command: '/ban <utilisateur>', description: 'Bannir un utilisateur d\'un groupe (Seul les admins du bot peuvent utiliser)' },
            { command: '/users', description: 'Voir tous les utilisateurs ayant interagi avec le bot' },
            { command: '/join', description: 'Ajouter le bot à un groupe (Répondre au message de notification)' },
            { command: '/notification', description: 'Envoyer une notification à tous les membres (Seul les admins peuvent utiliser)' },
            { command: '/call', description : 'Contacter admin du bot'},
            { command: '/video', description: 'Rechercher vos vidéos'},
        ];

        let message = '📜 **Liste des commandes disponibles :**\n\n';
        commands.forEach(cmd => {
            message += `╭─❍\n│ ✧${cmd.command} \n│- ${cmd.description}\n╰─━━━━━━━━━━━━━╾─◊\n`;
        });

        ctx.replyWithMarkdown(message);
    });
};
