import { GuildMember } from "discord.js";
import { Command } from "../Interfaces";

export const command: Command = {
    name: 'say',
    aliases: [],
    client_permission: ['SEND_MESSAGES'],
    user_permission: [],
    argMin: 2,
    args: {
        member: {
            type: "member",
            description: "The member to say something to."
        },
        text: {
            type: "longstring",
            description: "The text to send."
        },
    },
    run: async (client, message, args) => {
        const member: GuildMember = args[0] as unknown as GuildMember;
        const text: string = args[1] as unknown as string;

        message.channel.send(`${member.displayName} says: ${text}`);
    }
};
