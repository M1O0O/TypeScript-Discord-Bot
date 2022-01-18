import { GuildMember } from "discord.js";
import { Command } from "../Interfaces";

export const command: Command = {
    name: 'say',
    aliases: [],
    client_permission: ['SEND_MESSAGES'],
    user_permission: [],
    argMin: 2,
    usage: '<member> <text>',
    argsType: ['member', 'longstring'],
    run: async (client, message, args) => {
        const member: GuildMember = args[0] as unknown as GuildMember;
        const text: string = args[1] as unknown as string;
        
        message.channel.send(`${member}: ${text}`);
    }
};
