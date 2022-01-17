import { Command } from "../Interfaces";

export const command: Command = {
    name: 'say',
    aliases: [],
    client_permission: ['SEND_MESSAGES'],
    user_permission: [],
    argMin: 2,
    argMax: 2,
    usage: '<member> <message>',
    argsType: ['member', 'longstring'],
    run: async (client, message, args) => {
        message.channel.send(args.join(' '));
    }
};
