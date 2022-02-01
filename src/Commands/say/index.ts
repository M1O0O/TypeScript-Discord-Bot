import { TextChannel } from "discord.js";
import { Command } from "../../Interfaces";

export const command: Command = {
    name: 'say',
    client_permission: ['SEND_MESSAGES', 'MANAGE_MESSAGES'],
    user_permission: ['ADMINISTRATOR'],
    run: async (client, interaction, args) => {
        const content = args.getString('content');
        const channel: TextChannel = args.getChannel('channel') as TextChannel;

        channel ? channel.send(content) : interaction.channel.send(content);
        interaction.reply({
            content: 'Message sent!',
            ephemeral: true,
        });
    }
};
