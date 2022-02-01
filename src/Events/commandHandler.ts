import { Event } from "../Interfaces";
import * as Discord from "discord.js";

export const onMessage: Event = {
    name: "interactionCreate",
    run: async (client, interaction: Discord.CommandInteraction) => {
        if (!interaction.isCommand()) return;

        const command = interaction;
        const args = interaction.options;

        var cExec = client.commands.get(command.commandName);
        let subCommand;
        try { subCommand = interaction.options?.getSubcommand() } catch (e) { }
        if (subCommand) cExec = client.subCommands.get(`${command.commandName}-${subCommand}`);

        if (!cExec) return interaction.reply("😓 Command not found");

        if (cExec.client_permission) {
            const clientPermissions = interaction.guild.me.permissions;
            const missingPermissions = cExec.client_permission.filter(p => !clientPermissions.has(p));
            if (missingPermissions.length > 0) return interaction.reply(`😓 I'm missing permissions: ${missingPermissions.join(", ")}`).catch(() => { });
        }

        if (cExec.user_permission) {
            const userPermissions = await interaction.guild.members.fetch(interaction.user.id).then(m => m.permissions);
            const missingPermissions = cExec.user_permission.filter(p => !userPermissions.has(p));
            if (missingPermissions.length > 0) return interaction.reply(`😓 You are missing permissions: ${missingPermissions.join(", ")}`).catch(() => { });
        }

        cExec.run(client, (interaction as any), args);
        client.prompt.print.debug(`Command ${client.prompt.Colors.Blue}${command.commandName}${client.prompt.Colors.Reset} executed by ${client.prompt.Colors.Blue}${interaction.user.tag}`);
    }
}