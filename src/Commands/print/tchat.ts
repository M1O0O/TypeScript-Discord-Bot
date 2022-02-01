import { TextChannel } from "discord.js";
import { Command } from "../../Interfaces";

export const command: Command = {
    client_permission: ['SEND_MESSAGES'],
    user_permission: [],
    run: async (client, interaction, args) => {
        const content = args.getString('content');

        interaction.channel.send(content);
        interaction.reply({
            content: 'Message sent!',
            ephemeral: true,
        });
    }
};
