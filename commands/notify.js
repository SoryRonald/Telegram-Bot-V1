
module.exports = (bot) => {
    bot.on('new_chat_members', async (ctx) => {
        const botAdmins = [7728855185]; // Remplace par tes IDs admins
        for (const adminId of botAdmins) {
            bot.telegram.sendMessage(adminId, `📢 Le bot a été ajouté dans un groupe : ${ctx.chat.title}`);
        }
    });
};
