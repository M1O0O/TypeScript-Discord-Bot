import { Command, Event } from "../Interfaces";
import Client from '../Client';
import * as Discord from "discord.js";

export const onMessage: Event = {
    name: "interactionCreate",
    run: (client, interaction: Discord.CommandInteraction) => {
        if (!interaction.isCommand()) return;

        const command = interaction;
        const args = interaction.options;

        const cExec = client.commands.get(command.commandName);
        if (!cExec) return interaction.reply("😓 Command not found");

        cExec.run(client, (interaction as any), args);
    }
}