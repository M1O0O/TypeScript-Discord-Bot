import { Command } from "../Interfaces";

export const command: Command = {
    name: 'ping',
    aliases: ["p", "pong"],
    client_permission: ['SEND_MESSAGES'],
    user_permission: ['ADD_REACTIONS'],
    argMin: 0,
    argMax: 1,
    usage: '<member>',
    run: async (client, message, args) => {
        if (args[0]) {
            message.reply(`Pong! ${args[0]}`);
        } else {
            message.reply(`Pong!`);
        }
    },
};