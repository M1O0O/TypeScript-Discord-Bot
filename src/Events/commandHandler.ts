import { Event } from "../Interfaces";
import { Message } from "discord.js";

export const event: Event = {
    name: "messageCreate",
    run: (client, message: Message) => {
        if (
            message.author.bot ||
            !message.guild ||
            !message.content.startsWith(client.config.prefix)
        ) return;

        const args = message.content
            .slice(client.config.prefix.length)
            .trim()
            .split(/ +/g);

        const cmd = args.shift().toLowerCase();
        if (!cmd) return;
        const command = client.commands.get(cmd) || client.aliases.get(cmd);
        if (!command) return;

        const clientMember = message.guild.members.cache.get(client.user.id);

        if (command.client_permission && !clientMember.permissions.has(command.client_permission))
            return message.reply(
                `I don't have the required permissions to execute this command.`
            ).catch(() => { });

        if (command.user_permission && !message.member.permissions.has(command.user_permission))
            return message.reply(
                `You do not have permission to use this command.`
            ).catch(() => { });

        command.run(client, message, args);
    }
}