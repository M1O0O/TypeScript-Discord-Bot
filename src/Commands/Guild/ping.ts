import { Command } from "../../Interfaces";

export const command: Command = {
    name: 'ping',
    aliases: ["p", "pong"],
    client_permission: ['SEND_MESSAGES'],
    user_permission: ['ADD_REACTIONS'],
    run: async (client, message, args) => {
        message.reply(`I have ${client.ws.ping}ms ping`);
    }
};