import { Event } from "../Interfaces";
import Client from '../Client';
import * as Discord from "discord.js";

export const onMessage: Event = {
    name: "messageCreate",
    run: (client, message: Discord.Message) => exec(client, message)
}

export const onEdit: Event = {
    name: "messageUpdate",
    run: (client, before: Discord.Message, after: Discord.Message) => exec(client, after)
}

function exec(client: Client, message: Discord.Message) {
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

    if (command.argMin && args.length < command.argMin)
        return message.reply(
            `You need to provide at least ${command.argMin} arguments.\nUsage: \`${client.config.prefix}${command.name} ${command.usage}\``
        ).catch(() => { });

    if (command.argMax && args.length > command.argMax)
        return message.reply(
            `You can only provide up to ${command.argMax} arguments.\nUsage: \`${client.config.prefix}${command.name} ${command.usage}\``
        ).catch(() => { });

    command.run(client, message, args);
}