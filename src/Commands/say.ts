import { Command } from "../Interfaces";

export const command: Command = {
    name: 'say',
    aliases: [],
    client_permission: ['SEND_MESSAGES'],
    user_permission: [],
    argMin: 1,
    argMax: 1,
    usage: '<message>',
    argsType: ['longstring'],
    run: async (client, message, args) => {
        message.channel.send(args[0]);
    }
};
