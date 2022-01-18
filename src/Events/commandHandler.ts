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

async function exec(client: Client, message: Discord.Message) {
    if (!(message.channel as Discord.TextChannel).permissionsFor(client.user).has("SEND_MESSAGES")) return client.prompt.print.warn(`I've not the permission to send messages in ${message.channel.id}`);
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.startsWith(client.config.prefix)
    ) return;

    const args: any = message.content
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
        ).catch(() => { client.prompt.print.error(`Can't send a message in channel ${message.channel.id}`) });

    if (command.user_permission && !message.member.permissions.has(command.user_permission))
        return message.reply(
            `You do not have permission to use this command.`
        ).catch(() => { client.prompt.print.error(`Can't send a message in channel ${message.channel.id}`) });

    if (command.argMin && args.length < command.argMin)
        return message.reply(
            `You need to provide at least ${command.argMin} arguments.${command.usage ? `\nUsage: \`${client.config.prefix}${command.name} ${command.usage}\`` : ''}`
        ).catch(() => { });

    if (command.argsType) {
        for (let i = 0; i < command.argsType.length; i++) {
            const type = command.argsType[i];
            if (!args[i]) break;

            if (type === 'longstring') {
                args[i] = args.slice(i).join(' ');
                args.splice(i + 1);
            }

            if (type === 'number') args[i] = parseInt(args[i]);
            if (type === 'string') args[i] = args[i].toString();
            if (type === 'boolean') args[i] = ['true', 'yes', '1'].some(b => b === args[i].toLowerCase());
            if (type === 'user') {
                args[i] = message.mentions.users.first() || message.guild.members.cache.get(args[i]);
                if (!args[i]) return message.reply(`User not found.`);
            }
            if (type === 'channel') {
                args[i] = message.mentions.channels.first() || message.guild.channels.cache.get(args[i]);
                if (!args[i]) return message.reply(`Channel not found.`);
            }
            if (type === 'role') {
                args[i] = message.mentions.roles.first() || message.guild.roles.cache.get(args[i]);
                if (!args[i]) return message.reply(`Role not found.`);
            }
            if (type === 'member') {
                args[i] = message.mentions.members.first() || message.guild.members.cache.get(args[i]);
                if (!args[i]) return message.reply(`Member not found.`);
            }
        };
    }

    const argMax = command.argsType.length;

    if (argMax && args.length > argMax)
        return message.reply(
            `You can only provide up to ${argMax} arguments.${command.usage ? `\nUsage: \`${client.config.prefix}${command.name} ${command.usage}\`` : ''}`
        ).catch(() => { });

    command.run(client, message, args);
}